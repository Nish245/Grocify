from flask import Flask, jsonify
import pandas as pd
import numpy as np
from joblib import load

# Initialize Flask app
app = Flask(__name__)

# Load the trained model
MODEL_FILE = 'discount_notification_model.joblib'
model = load(MODEL_FILE)

# Load the merged dataset
MERGED_FILE = 'merged_data.csv'
merged_data = pd.read_csv(MERGED_FILE)

# Fill missing values in price columns
merged_data[['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']] = merged_data[
    ['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']
].fillna(0)

# Define an endpoint to get discounted products
@app.route('/get-discounted-products', methods=['GET'])
def get_discounted_products():
    try:
        # Prepare features for prediction
        X = merged_data[['Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']]

        # Predict discount flags
        predictions = model.predict(X)

        # Add predictions to the dataset
        merged_data['Discount_Flag'] = predictions

        # Get discounted products
        discounted_products = merged_data[merged_data['Discount_Flag'] == 1][
            ['Product', 'Price_Aldi', 'Price_Coles', 'Price_IGA', 'Price_Woolworths']
        ]

        # Replace 0.0 and NaN with None for cleaner output
        discounted_products = discounted_products.replace({0.0: None, np.nan: None})

        # Convert to JSON and send response
        response = discounted_products.to_dict(orient='records')
        return jsonify({"discounted_products": response})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    print("Starting Flask application...")
    app.run(debug=True, port=5000)
