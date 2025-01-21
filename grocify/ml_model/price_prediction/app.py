from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load the trained model
model = joblib.load('xgboost_price_prediction_model.pkl')

# Store location mapping
store_locations = {
    "Coles": "123 Main St, Melbourne",
    "IGA": "456 Central Ave, Sydney",
    "Woolworths": "789 King Rd, Brisbane"
}

# Initialize Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        input_data = request.get_json()

        # Convert JSON to DataFrame
        df = pd.DataFrame([input_data])

        # Make prediction
        prediction = model.predict(df)[0]

        # Convert prediction to standard float
        prediction = float(prediction)

        # Determine the store based on the input
        stores = ["Coles", "IGA", "Woolworths"]
        selected_store = None
        for i, store in enumerate(stores):
            if input_data[f"Store_{store}"] == 1:
                selected_store = store
                break

        # Add location based on the selected store
        store_location = store_locations.get(selected_store, "Unknown location")

        # Return the prediction and store location as a JSON response
        return jsonify({
            'predicted_lowest_price': round(prediction, 2),
            'store': selected_store,
            'store_location': store_location
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
