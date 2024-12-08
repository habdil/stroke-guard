import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Cigarette, Scale } from "lucide-react";

const riskFactors = [
  {
    icon: Heart,
    title: "Heart Disease",
    description: "Previous heart conditions can increase stroke risk significantly."
  },
  {
    icon: Activity,
    title: "High Blood Pressure",
    description: "Hypertension is a major risk factor for stroke."
  },
  {
    icon: Cigarette,
    title: "Smoking",
    description: "Smoking increases the risk of blood clots and artery damage."
  },
  {
    icon: Scale,
    title: "BMI",
    description: "Being overweight can increase your risk of stroke."
  }
];

export default function RiskFactors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Factors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {riskFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div key={index} className="flex gap-4">
                <Icon className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-medium">{factor.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {factor.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}