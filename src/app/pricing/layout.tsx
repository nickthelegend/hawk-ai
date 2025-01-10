"use client";

import "./global.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black antialiased">
      <Navigation />
      {children}
    </div>
  );
}
