'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PredictionResult {
  prediction: number;
  probability: number;
  risk_factors: string[];
  confidence: string;
  threshold: number;
}

interface ResultDisplayProps {
  result: PredictionResult;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResultDisplay({ result, isOpen, onClose }: ResultDisplayProps) {
  const isHighRisk = result.prediction === 1;
  const probabilityPercentage = result.probability * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {isHighRisk ? (
              <AlertTriangle className="text-red-500 h-6 w-6" />
            ) : (
              <CheckCircle className="text-green-500 h-6 w-6" />
            )}
            Stroke Risk Assessment Result
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Risk Level */}
          <div>
            <p className="text-lg font-medium flex items-center gap-2">
              Risk Level: 
              <span className={`${isHighRisk ? 'text-red-500' : 'text-green-500'} font-bold`}>
                {isHighRisk ? 'HIGH' : 'LOW'}
              </span>
            </p>
            
            {/* Probability Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk Probability</span>
                <span className="font-medium">{probabilityPercentage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={probabilityPercentage} 
                className="h-3"
                style={{
                  background: isHighRisk ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                  '--progress-background': isHighRisk ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
                } as any}
              />
            </div>
          </div>

          {/* Confidence Level */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <p className="text-sm font-medium flex items-center gap-2">
              <Info className="w-4 h-4" />
              Prediction Confidence: <span className="font-bold">{result.confidence}</span>
            </p>
          </div>

          {/* Risk Factors */}
          {result.risk_factors.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Identified Risk Factors:</h3>
              <ul className="space-y-2">
                {result.risk_factors.map((factor, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendation */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Recommendations:</h3>
            <p className="text-sm text-muted-foreground">
              {isHighRisk ? (
                <>Based on the analysis, we strongly recommend consulting with a healthcare provider 
                to discuss these results and develop appropriate preventive measures.</>
              ) : (
                <>While your risk level is low, maintaining a healthy lifestyle through regular exercise, 
                balanced diet, and routine check-ups is important for continued well-being.</>
              )}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant={isHighRisk ? "destructive" : "default"}
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}