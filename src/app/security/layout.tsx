"use client";

import "./global.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black antialiased">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
