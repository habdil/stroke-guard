import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, LineChart, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Technology",
    description: "Using state-of-the-art machine learning algorithms for accurate predictions."
  },
  {
    icon: Activity,
    title: "Real-time Analysis",
    description: "Instant risk assessment based on your health data."
  },
  {
    icon: LineChart,
    title: "Data-Driven Insights",
    description: "Comprehensive analysis based on multiple health parameters."
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your health data is secured with enterprise-grade encryption."
  }
];

export default function SystemInfo() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our System</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}