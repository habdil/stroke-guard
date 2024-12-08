import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Initialize Inter font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "StrokeGuard - Intelligent Stroke Risk Prediction System",
    template: "%s | StrokeGuard",
  },
  description: "An advanced system for predicting stroke risk using health data and lifestyle factors.",
  keywords: [
    "stroke prediction",
    "health",
    "medical",
    "risk assessment",
    "healthcare",
    "AI prediction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}