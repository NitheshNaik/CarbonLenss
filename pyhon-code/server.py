# python-code/server.py
from flask import Flask, request, jsonify
from receipt_model import ReceiptProcessor
import os

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
rp = ReceiptProcessor()

@app.route("/process-receipt", methods=["POST"])
def process_receipt():
    if "receipt" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["receipt"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    data = rp.process_receipt(file_path)
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5002, debug=True)
