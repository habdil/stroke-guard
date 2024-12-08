import Hero from "@/components/sections/home/hero"
import Features from "@/components/sections/home/features"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Check Your Stroke Risk?
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              Start your free risk assessment now and take the first step 
              towards better health awareness.
            </p>
            <Button size="lg" asChild>
              <Link href="/predict">
                Start Free Assessment
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}