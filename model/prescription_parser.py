

from pdf2image import convert_from_path  # No longer needed
import pytesseract
import matplotlib.pyplot as plt
import numpy as np
import cv2
import re
from PIL import Image  # Importing Image module
from typing import Dict  # Used as type hint

# Setting required paths related to library functions
TESSERACT_ENGINE_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = TESSERACT_ENGINE_PATH

# Path of the image file
IMAGE_PATH = r"C:\Users\kgopi\Downloads\model\img4.jpg"

# Load the image
image = Image.open(IMAGE_PATH)

# Function to preprocess the image
def preprocess_image(img: Image.Image) -> np.ndarray:
    gray = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    resized = cv2.resize(gray, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)  # Upscale
    processed_image = cv2.adaptiveThreshold(
        resized, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 63, 12
    )
    return processed_image

# Apply preprocessing
img = preprocess_image(image)

# Display the images before and after preprocessing
plt.figure(figsize=(14, 8))
plt.subplot(1, 2, 1)
plt.imshow(image)
plt.axis(False)
plt.title("Original Image")
plt.subplot(1, 2, 2)
plt.imshow(img, cmap="gray")
plt.axis(False)
plt.title("Preprocessed Image")
plt.show()

# Extract text from the preprocessed image
text_1 = pytesseract.image_to_string(img, lang="eng")
print(text_1)

# Function to extract structured data
def parse(text: str) -> Dict:
    return {
        "patient_name": get_field("patient_name", text),
        "patient_address": get_field("patient_address", text),
        "medicines": get_field("medicines", text),
        "directions": get_field("directions", text),
        "refill": get_field("refill", text),
    }

# Function to extract fields using regex
def get_field(field_name: str, text: str) -> str:
    pattern_dict = {
        "patient_name": {"pattern": "Name:(.*)Date", "flags": 0},
        "patient_address": {"pattern": "Address:(.*)", "flags": 0},
        "medicines": {"pattern": "Address:[^\n](.)Directions", "flags": re.DOTALL},
        "directions": {"pattern": "Directions:.(.*)Refill", "flags": re.DOTALL},
        "refill": {"pattern": "Refill:.*(\d).*times", "flags": 0},
    }

    pattern_object = pattern_dict.get(field_name)
    if pattern_object:
        matches = re.findall(pattern_object["pattern"], text, flags=pattern_object["flags"])
        if len(matches) > 0:
            return matches[0].strip()

# Extract structured fields from text
print("\nExtracted Information:\n", parse(text_1))
