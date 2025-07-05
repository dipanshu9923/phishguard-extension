from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS  # Optional but useful for browser-based apps

app = Flask(__name__)
CORS(app)  # 👈 Allow cross-origin requests (Chrome extension to Flask)

# ✅ Load your trained model
with open("phishing_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        print("🔍 Received request data:", data)

        # ✅ Extract features safely
        features = data.get('features')
        if not features or len(features) != 30:
            return jsonify({"error": "Invalid or missing 'features'. Must be 31 values."}), 400

        # ✅ Run model prediction
        prediction = model.predict([features])[0]
        result = "phishing" if prediction == 1 else "legitimate"

        return jsonify({
            "prediction": result
        })

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
