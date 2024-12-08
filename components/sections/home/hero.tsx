import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Early Prediction for{" "}
            <span className="text-primary-600">Better Prevention</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            StrokeGuard uses advanced AI to help predict stroke risks early, 
            enabling better prevention and healthier lives through data-driven insights.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/predict">
                Start Prediction
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}