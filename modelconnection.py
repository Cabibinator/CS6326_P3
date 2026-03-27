from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
import traceback

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "P3_I4.keras")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

# Load model ONCE (important)
model = tf.keras.models.load_model(MODEL_PATH)

IMG_SIZE = (256, 256)

def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    image = np.array(image) / 255.0
    # Add channel dimension if grayscale
    if len(image.shape) == 2:
        image = np.expand_dims(image, axis=-1)
    image = np.expand_dims(image, axis=0)
    return image

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        image = Image.open(file.stream).convert("L")  # Convert to grayscale (1 channel)

        processed = preprocess_image(image)
        
        print(f"\n>>> Input shape: {processed.shape}")
        print(f">>> Min/Max values: {processed.min():.4f} / {processed.max():.4f}")

        prediction = model.predict(processed, verbose=0)
        print(f">>> Raw prediction: {prediction}")
        # For sigmoid binary classification: threshold at 0.5
        predicted_class = 1 if prediction[0][0] > 0.5 else 0
        print(f">>> Predicted class: {predicted_class}\n")

        return jsonify({
            "prediction": predicted_class,
            "raw": prediction.tolist(),
        })
    except Exception as ex:
        tb = traceback.format_exc()
        app.logger.error("Prediction exception:\n%s", tb)
        return jsonify({"error": str(ex), "trace": tb}), 500

if __name__ == "__main__":
    # Print model info for debugging
    print("\n" + "="*50)
    print("MODEL ARCHITECTURE")
    print("="*50)
    model.summary()
    print("="*50 + "\n")
    
    app.run(debug=True,port=5000)