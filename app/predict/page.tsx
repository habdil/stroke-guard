import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Activity, AlertCircle, Heart, BarChart2, ArrowRight } from "lucide-react";
import PredictionForm from "@/components/sections/predict/prediction-form";
import RiskFactors from "@/components/sections/predict/risk-factor";

export const metadata: Metadata = {
  title: "Stroke Prediction - StrokeGuard",
  description: "Get an instant assessment of your stroke risk using our AI-powered prediction system.",
};

const stats = [
  {
    icon: Activity,
    name: "Accuracy Rate",
    value: "95%",
    description: "Model prediction accuracy",
    color: "text-blue-500"
  },
  {
    icon: Heart,
    name: "Predictions Made",
    value: "10,000+",
    description: "Successful predictions",
    color: "text-red-500"
  },
  {
    icon: AlertCircle,
    name: "Risk Factors",
    value: "15+",
    description: "Health indicators analyzed",
    color: "text-yellow-500"
  },
  {
    icon: BarChart2,
    name: "Processing Time",
    value: "<1s",
    description: "Fast result generation",
    color: "text-green-500"
  }
];

const steps = [
  {
    number: "01",
    title: "Enter Information",
    description: "Fill in your health details and lifestyle information in the secure form."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI system analyzes your data using machine learning algorithms."
  },
  {
    number: "03",
    title: "Get Results",
    description: "Receive instant, detailed results about your stroke risk assessment."
  }
];

export default function PredictPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              AI-Powered Health Assessment
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Stroke Risk Prediction
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Get an instant assessment of your stroke risk using our advanced AI system.
              Simply enter your health information below for a detailed analysis.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className={`rounded-full p-3 bg-primary/10 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{stat.name}</h3>
                    <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white/50 dark:bg-slate-800/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary font-bold">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-center text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Prediction Form Column */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Enter Your Information</h2>
                <p className="text-muted-foreground mb-6">
                  Fill in your health information below for an accurate stroke risk assessment.
                  All data is processed securely and privately.
                </p>
                <PredictionForm />
              </Card>
            </div>

            {/* Risk Factors Column */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Risk Factors</h2>
                <p className="text-muted-foreground mb-6">
                  Understanding the key factors that contribute to stroke risk.
                </p>
                <RiskFactors />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Card className="p-8">
              <h2 className="text-2xl font-bold">Privacy & Security</h2>
              <p className="mt-4 text-muted-foreground">
                Your health information is important to us. All data is processed securely
                and we never store any personal health information. Our AI model provides
                predictions based on statistical analysis of anonymized data.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}