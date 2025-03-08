'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ResultDisplay from './result-display';
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Types
interface PredictionResult {
  prediction: number;
  probability: number;
  risk_factors: string[];
  confidence: string;
  threshold: number;
}

interface FastAPIError {
  detail?: string | { msg: string }[];
  error?: string;
}

const API_URL = 'http://localhost:8000/';

export default function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateNumericField = (value: number, fieldName: string, min: number, max: number) => {
    if (isNaN(value)) throw new Error(`${fieldName} must be a valid number`);
    if (value < min || value > max) {
      throw new Error(`${fieldName} must be between ${min} and ${max}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validate required fields
      const requiredFields = ['age', 'gender', 'hypertension', 'heart_disease', 
        'ever_married', 'residence_type', 'avg_glucose_level', 'bmi', 
        'work_type', 'smoking_status'];
      
      for (const field of requiredFields) {
        if (!formData.get(field)) {
          throw new Error(`Please fill in all required fields`);
        }
      }

      // Validate numeric fields
      const age = parseFloat(formData.get('age') as string);
      const bmi = parseFloat(formData.get('bmi') as string);
      const glucose = parseFloat(formData.get('avg_glucose_level') as string);

      validateNumericField(age, 'Age', 0, 120);
      validateNumericField(bmi, 'BMI', 10, 60);
      validateNumericField(glucose, 'Glucose level', 0, 500);

      const data = {
        "age": age,
        "gender": formData.get('gender') === 'male' ? 1 : 0,
        "hypertension": formData.get('hypertension') === 'true' ? 1 : 0,
        "heart_disease": formData.get('heart_disease') === 'true' ? 1 : 0,
        "ever_married": formData.get('ever_married') === 'yes' ? 1 : 0,
        "Residence_type": formData.get('residence_type') === 'Urban' ? 1 : 0,
        "avg_glucose_level": glucose,
        "bmi": bmi,
        "work_type_Govt_job": formData.get('work_type') === 'Govt_job' ? 1 : 0,
        "work_type_Never_worked": formData.get('work_type') === 'Never_worked' ? 1 : 0,
        "work_type_Private": formData.get('work_type') === 'Private' ? 1 : 0,
        "work_type_Self_employed": formData.get('work_type') === 'Self-employed' ? 1 : 0,
        "work_type_children": formData.get('work_type') === 'children' ? 1 : 0,
        "smoking_status_Unknown": formData.get('smoking_status') === 'Unknown' ? 1 : 0,
        "smoking_status_formerly_smoked": formData.get('smoking_status') === 'formerly smoked' ? 1 : 0,
        "smoking_status_never_smoked": formData.get('smoking_status') === 'never smoked' ? 1 : 0,
        "smoking_status_smokes": formData.get('smoking_status') === 'smokes' ? 1 : 0
      };

      console.log('Sending data:', data);

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = 'Prediction failed';
        
        if (responseData.detail) {
          if (Array.isArray(responseData.detail)) {
            // Handle array of validation errors
            const firstError = responseData.detail[0];
            errorMessage = firstError.msg || 'Validation error';
            
            // If it's a field required error, make it more user-friendly
            if (firstError.type === 'missing') {
              const fieldName = firstError.loc[firstError.loc.length - 1];
              errorMessage = `Please fill in the ${fieldName} field`;
            }
          } else {
            errorMessage = responseData.detail;
          }
        }

        throw new Error(errorMessage);
      }

      console.log('Received result:', responseData);
      setResult(responseData);
      setIsDialogOpen(true);
    } catch (error) {
      let errorMessage = "Failed to make prediction. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'detail' in error) {
        // Handle FastAPI error format
        const fastAPIError = error as { detail: any };
        if (Array.isArray(fastAPIError.detail)) {
          const firstError = fastAPIError.detail[0];
          errorMessage = firstError.msg || 'Validation error';
          
          // Make field required errors more user-friendly
          if (firstError.type === 'missing') {
            const fieldName = firstError.loc[firstError.loc.length - 1];
            errorMessage = `Please fill in the ${fieldName} field`;
          }
        } else {
          errorMessage = String(fastAPIError.detail);
        }
      }

      console.error('Prediction error:', { error, message: errorMessage });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
};

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                type="number" 
                id="age" 
                name="age" 
                required 
                min="0" 
                max="120" 
                className="mt-1" 
                placeholder="Enter age (0-120)"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ever_married">Ever Married</Label>
              <Select name="ever_married" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Health Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="bmi">BMI</Label>
              <Input 
                type="number" 
                id="bmi" 
                name="bmi" 
                required 
                min="10" 
                max="60" 
                step="0.1" 
                className="mt-1" 
                placeholder="Enter BMI (10-60)" 
              />
            </div>

            <div>
              <Label htmlFor="avg_glucose_level">Average Glucose Level</Label>
              <Input 
                type="number" 
                id="avg_glucose_level" 
                name="avg_glucose_level" 
                required 
                min="0" 
                max="500" 
                step="0.1" 
                className="mt-1"
                placeholder="Enter glucose level (0-500)"
              />
            </div>

            <div>
              <Label htmlFor="hypertension">Hypertension</Label>
              <Select name="hypertension" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="heart_disease">Heart Disease</Label>
              <Select name="heart_disease" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lifestyle Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="work_type">Work Type</Label>
              <Select name="work_type" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Self-employed">Self-employed</SelectItem>
                  <SelectItem value="Govt_job">Government Job</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="Never_worked">Never worked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="residence_type">Residence Type</Label>
              <Select name="residence_type" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select residence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="smoking_status">Smoking Status</Label>
              <Select name="smoking_status" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never smoked">Never Smoked</SelectItem>
                  <SelectItem value="formerly smoked">Formerly Smoked</SelectItem>
                  <SelectItem value="smokes">Currently Smoking</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 mt-6" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Get Prediction'
          )}
        </Button>
      </form>

      {result && (
        <ResultDisplay 
          result={result} 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
        />
      )}
    </div>
  );
}
