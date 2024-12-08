import { Metadata } from "next";
import ContactForm from "@/components/sections/contact/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact - StrokeGuard",
  description: "Get in touch with StrokeGuard team for questions, support, or partnerships.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about StrokeGuard? We're here to help. 
              Reach out to our team using any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                support@strokeguard.com
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">
                +1 (555) 123-4567
              </p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="health-card p-6">
                <h3 className="font-semibold mb-2">
                  How accurate is the prediction system?
                </h3>
                <p className="text-muted-foreground">
                  Our system maintains a 95% accuracy rate, validated through extensive testing 
                  and medical reviews.
                </p>
              </div>
              <div className="health-card p-6">
                <h3 className="font-semibold mb-2">
                  Is my health data secure?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we use enterprise-grade encryption and follow strict privacy guidelines 
                  to protect your health information.
                </p>
              </div>
              <div className="health-card p-6">
                <h3 className="font-semibold mb-2">
                  How quickly can I get results?
                </h3>
                <p className="text-muted-foreground">
                  Results are generated instantly after you submit your health data through 
                  our prediction form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}