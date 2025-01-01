import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify

# Load the trained k-NN model and feature matrix
knn_model = joblib.load("item_recommendation_knn_model.joblib")
feature_matrix = np.load("feature_matrix.npy")

# Load the merged data for metadata (e.g., product names, categories, prices, image URLs)
merged_data = pd.read_csv("merged_data.csv")

# Initialize Flask app
app = Flask(__name__)

# Function to recommend products by index
def recommend_by_index(product_index, top_n):
    try:
        # Find k-nearest neighbors
        distances, indices = knn_model.kneighbors(feature_matrix[product_index].reshape(1, -1), n_neighbors=top_n + 1)

        # Prepare recommendations
        recommendations = []
        for i, distance in zip(indices[0][1:], distances[0][1:]):  # Skip the first as it's the input product
            product = merged_data.iloc[i]
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

# Function to get product index by name
def get_product_index_by_name(product_name):
    try:
        # Find the first product matching the name (case-insensitive search)
        product_index = merged_data[merged_data['Product'].str.contains(product_name, case=False, na=False)].index[0]
        return product_index
    except IndexError:
        return None  # Return None if no product is found

# API endpoint to recommend by product index
@app.route('/recommend', methods=['GET'])
def recommend_api():
    try:
        # Get query parameters
        product_index = int(request.args.get('product_index', -1))
        top_n = int(request.args.get('top_n', 5))

        if product_index < 0 or product_index >= len(feature_matrix):
            return jsonify({"error": "Invalid product index provided."}), 400

        # Get recommendations
        recommendations = recommend_by_index(product_index, top_n)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# API endpoint to recommend by product name
@app.route('/recommend_by_name', methods=['GET'])
def recommend_by_name_api():
    try:
        # Get query parameters
        product_name = request.args.get('product_name', '')
        top_n = int(request.args.get('top_n', 5))

        if not product_name:
            return jsonify({"error": "Product name is required."}), 400

        # Get product index by name
        product_index = get_product_index_by_name(product_name)

        if product_index is None:
            # Suggest similar product names if the exact match is not found
            suggestions = merged_data[merged_data['Product'].str.contains(product_name[:3], case=False, na=False)].head(5)['Product'].tolist()
            return jsonify({
                "error": f"Product '{product_name}' not found.",
                "suggestions": suggestions
            }), 404

        # Get recommendations
        recommendations = recommend_by_index(product_index, top_n)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, ssl_context=('cert.pem', 'key.pem'))
