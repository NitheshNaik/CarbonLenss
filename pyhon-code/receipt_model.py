# python-code/receipt_model.py
import pytesseract
from PIL import Image
import pandas as pd
from fuzzywuzzy import process
import json
import os

# Load CO₂ database
carbon_db_path = os.path.join(os.path.dirname(__file__), "carbon_db2.csv")
carbon_db = pd.read_csv(carbon_db_path)

class ReceiptProcessor:
    def __init__(self, db=carbon_db):
        self.db = db

    def extract_items(self, image_path):
        """Extract text from image using Tesseract and parse items."""
        text = pytesseract.image_to_string(Image.open(image_path))
        lines = text.split("\n")
        items = []
        for line in lines:
            line = line.strip()
            if line and not any(word in line.lower() for word in ["total", "subtotal", "tax"]):
                items.append(line)
        return items

    def map_to_co2(self, items_list):
        """Map OCR items to CO₂ values using fuzzy matching."""
        results = []
        for item in items_list:
            match, score, _ = process.extractOne(item, self.db["item"])
            if score > 70:
                co2_info = self.db[self.db["item"] == match].iloc[0]
                results.append({
                    "item": match,
                    "category": co2_info["category"],
                    "co2_per_unit": co2_info["co2_per_unit"],
                    "unit": co2_info["unit"],
                    "quantity": 1,
                    "total_co2": co2_info["co2_per_unit"]
                })
            else:
                results.append({
                    "item": item,
                    "category": "Unknown",
                    "co2_per_unit": 0,
                    "unit": "-",
                    "quantity": 1,
                    "total_co2": 0
                })
        return results

    def process_receipt(self, image_path):
        items = self.extract_items(image_path)
        mapped = self.map_to_co2(items)
        total_co2 = sum(i["total_co2"] for i in mapped)
        return {
            "items": mapped,
            "total_co2": total_co2
        }

# For direct testing
if __name__ == "__main__":
    import sys
    path = sys.argv[1]
    rp = ReceiptProcessor()
    result = rp.process_receipt(path)
    print(json.dumps(result, indent=2))
