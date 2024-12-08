import { Metadata } from "next";
import Team from "@/components/sections/about/team";
import SystemInfo from "@/components/sections/about/system-info";

export const metadata: Metadata = {
  title: "About - StrokeGuard",
  description: "Learn about StrokeGuard's mission, our team, and the technology behind our stroke prediction system.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About StrokeGuard</h1>
            <p className="text-lg text-muted-foreground">
              StrokeGuard combines advanced AI technology with medical expertise to 
              provide accurate stroke risk predictions, helping people take preventive 
              measures before it's too late.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
            <div className="health-card p-8">
              <p className="text-lg text-center mb-4">
                To revolutionize stroke prevention through accessible and accurate 
                risk prediction, empowering individuals to take control of their health.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary mb-2">95%</div>
                  <p className="text-muted-foreground">Accuracy Rate</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary mb-2">10k+</div>
                  <p className="text-muted-foreground">Predictions Made</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Info Section */}
      <SystemInfo />

      {/* Team Section */}
      <Team />
    </>
  );
}