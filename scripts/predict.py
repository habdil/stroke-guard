import sys
import json
import traceback
from pathlib import Path
import os

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

def log(message):
    """Print log messages to stderr"""
    print(message, file=sys.stderr, flush=True)

class CustomStrokePredictor:
    def __init__(self):
        try:
            from ml.utils.prediction import StrokePredictor
            self.predictor = StrokePredictor()
        except Exception as e:
            log(f"Error initializing predictor: {str(e)}")
            raise

def predict_from_json():
    try:
        # Initialize predictor
        log("Initializing predictor...")
        predictor = CustomStrokePredictor().predictor
        log("Predictor initialized successfully")

        # Get and validate input
        if len(sys.argv) <= 1:
            log("No input provided, using default data")
            input_data = None
        else:
            try:
                input_str = sys.argv[1].strip("'\"")  # Remove any extra quotes
                input_data = json.loads(input_str)
                log("Input data parsed successfully")
            except json.JSONDecodeError as e:
                log(f"JSON decode error: {str(e)}")
                input_data = None

        # Use default data if no input provided or invalid
        if input_data is None:
            input_data = {
                "age": 50,
                "gender": 1,
                "hypertension": 0,
                "heart_disease": 0,
                "ever_married": 1,
                "Residence_type": 1,
                "avg_glucose_level": 100,
                "bmi": 25,
                "work_type_Govt_job": 0,
                "work_type_Never_worked": 0,
                "work_type_Private": 1,
                "work_type_Self-employed": 0,
                "work_type_children": 0,
                "smoking_status_Unknown": 0,
                "smoking_status_formerly_smoked": 0,
                "smoking_status_never_smoked": 1,
                "smoking_status_smokes": 0
            }
            log("Using default test data")

        # Make prediction
        log("Making prediction...")
        result = predictor.make_prediction(input_data)
        log("Prediction completed")
        
        # Clean result
        cleaned_result = {
            "prediction": int(result["prediction"]),
            "probability": float(result["probability"]),
            "risk_factors": list(result["risk_factors"]),
            "confidence": str(result["confidence"]),
            "threshold": float(result["threshold"])
        }
        
        # Send only the JSON result to stdout
        log("Sending prediction result...")
        print(json.dumps(cleaned_result), flush=True)
        
    except Exception as e:
        error_response = {
            "error": type(e).__name__,
            "message": str(e),
            "traceback": traceback.format_exc()
        }
        print(json.dumps(error_response), flush=True)
        sys.exit(1)

if __name__ == "__main__":
    predict_from_json()