import { Brain, Activity, LineChart, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Advanced AI Analysis",
    description: "Utilizing state-of-the-art machine learning algorithms to analyze health data with high accuracy.",
    icon: Brain,
  },
  {
    title: "Real-time Risk Assessment",
    description: "Get immediate insights about potential stroke risks based on your health indicators.",
    icon: Activity,
  },
  {
    title: "Data-Driven Insights",
    description: "Comprehensive analysis based on multiple health factors and lifestyle choices.",
    icon: LineChart,
  },
  {
    title: "Preventive Recommendations",
    description: "Receive personalized recommendations to help reduce your stroke risk factors.",
    icon: Shield,
  },
]

export default function Features() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose StrokeGuard?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our system combines medical expertise with advanced technology 
            to provide accurate stroke risk predictions.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-none shadow-lg">
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}