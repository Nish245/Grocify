from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ---------------- DISCOUNT MODEL ---------------- #
discount_model = joblib.load("./discount_notification_model/discount_notification_model.joblib")
discount_data = pd.read_csv("./discount_notification_model/merged_data.csv")

# Fill missing values in price columns
discount_data[['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']] = discount_data[
    ['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']
].fillna(0)

@app.route('/get-discounted-products', methods=['GET'])
def get_discounted_products():
    try:
        X = discount_data[['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']]
        predictions = discount_model.predict(X)
        discount_data['Discount_Flag'] = predictions
        discounted_products = discount_data[discount_data['Discount_Flag'] == 1][
            ['Product', 'Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']
        ].replace({0.0: None, np.nan: None})
        return jsonify({"discounted_products": discounted_products.to_dict(orient='records')})
    except Exception as e:
        return jsonify({"error": str(e)})

# ---------------- RECOMMENDATION MODEL ---------------- #
recommendation_model = joblib.load("./item_recommendation_model/item_recommendation_knn_model.joblib")
feature_matrix = np.load("./item_recommendation_model/feature_matrix.npy")
recommendation_data = pd.read_csv("./item_recommendation_model/merged_data.csv")

def recommend_by_index(product_index, top_n):
    try:
        distances, indices = recommendation_model.kneighbors(
            feature_matrix[product_index].reshape(1, -1), n_neighbors=top_n + 1
        )
        recommendations = []
        for i, distance in zip(indices[0][1:], distances[0][1:]): 
            product = recommendation_data.iloc[i]
            recommendations.append({
                'Product': product['Product'],
                'Distance': float(distance),
                'Price': product['Average_Price'],
                'Image_URL': product.get('Product_Image_URL', ''),
                'Store Availability': {
                    'Aldi': not pd.isna(product['Price_Aldi']),
                    'Coles': not pd.isna(product['Price_Coles']),
                    'IGA': not pd.isna(product['Price_IGA']),
                    'Woolworths': not pd.isna(product['Price_Woolworths']),
                }
            })
        return recommendations
    except Exception as e:
        return {"error": str(e)}

def get_product_index_by_name(product_name):
    try:
        return recommendation_data[recommendation_data['Product'].str.contains(product_name, case=False, na=False)].index[0]
    except IndexError:
        return None

@app.route('/recommend', methods=['GET'])
def recommend_api():
    try:
        product_index = int(request.args.get('product_index', -1))
        top_n = int(request.args.get('top_n', 5))
        if product_index < 0 or product_index >= len(feature_matrix):
            return jsonify({"error": "Invalid product index."}), 400
        return jsonify(recommend_by_index(product_index, top_n))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend_by_name', methods=['GET'])
def recommend_by_name_api():
    try:
        product_name = request.args.get('product_name', '')
        top_n = int(request.args.get('top_n', 5))
        if not product_name:
            return jsonify({"error": "Product name is required."}), 400
        product_index = get_product_index_by_name(product_name)
        if product_index is None:
            suggestions = recommendation_data[
                recommendation_data['Product'].str.contains(product_name[:3], case=False, na=False)
            ].head(5)['Product'].tolist()
            return jsonify({"error": f"Product '{product_name}' not found.", "suggestions": suggestions}), 404
        return jsonify(recommend_by_index(product_index, top_n))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- PRICE PREDICTION MODEL ---------------- #
price_model = joblib.load('./price_prediction/xgboost_price_prediction_model.pkl')

store_locations = {
    "Coles": "123 Main St, Melbourne",
    "IGA": "456 Central Ave, Sydney",
    "Woolworths": "789 King Rd, Brisbane"
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        df = pd.DataFrame([input_data])
        prediction = float(price_model.predict(df)[0])

        stores = ["Coles", "IGA", "Woolworths"]
        selected_store = next((store for store in stores if input_data.get(f"Store_{store}", 0) == 1), None)
        store_location = store_locations.get(selected_store, "Unknown location")

        return jsonify({
            'predicted_lowest_price': round(prediction, 2),
            'store': selected_store,
            'store_location': store_location
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ---------------- RUN THE APP ---------------- #
if __name__ == '__main__':
    app.run(debug=True, port=5000)
