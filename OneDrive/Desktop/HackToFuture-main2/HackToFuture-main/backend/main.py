from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
import cv2
import numpy as np
import re
from PIL import Image
import os
from typing import Dict

# Initialize FastAPI app
app = FastAPI()

# ✅ Fix Tesseract Path Issues (Windows)
TESSERACT_ENGINE_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = TESSERACT_ENGINE_PATH

# ✅ CORS Configuration (Ensure React frontend can communicate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Function to preprocess image for OCR
def preprocess_image(img: Image.Image) -> np.ndarray:
    gray = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    resized = cv2.resize(gray, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)  # Upscale
    processed_image = cv2.adaptiveThreshold(
        resized, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 63, 12
    )
    return processed_image

# ✅ Function to extract fields using regex
def get_field(field_name: str, text: str) -> str:
    pattern_dict = {
        "patient_name": {"pattern": r"Name:(.*)Date", "flags": 0},
        "patient_address": {"pattern": r"Address:(.*)", "flags": 0},
        "medicines": {"pattern": r"Directions:([,*])", "flags": 0},
        "directions": {"pattern": r"Directions:(.*)Refill", "flags": re.DOTALL},
        "refill": {"pattern": r"Refill:.*(\d).*times", "flags": 0},
    }

    pattern_object = pattern_dict.get(field_name)
    if pattern_object:
        matches = re.findall(pattern_object["pattern"], text, flags=pattern_object["flags"])
        if matches:
            return matches[0].strip()
    return "Not Found"

# ✅ Function to parse extracted text
def parse(text: str) -> Dict:
    return {
        "patient_name": get_field("patient_name", text),
        "patient_address": get_field("patient_address", text),
        "medicines": get_field("directions", text),
        "directions": get_field("directions", text),
        "refill": get_field("refill", text),
    }

# ✅ API Endpoint to process image
@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Open Image
        image = Image.open(file.file)

        # Preprocess Image
        processed_img = preprocess_image(image)

        # Extract Text
        extracted_text = pytesseract.image_to_string(processed_img, lang="eng")

        # Parse Data
        extracted_info = parse(extracted_text)

        return JSONResponse(content={"data": extracted_info})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# ✅ Run the server using:
# uvicorn main:app --reload
