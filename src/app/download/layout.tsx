"use client"

import "./global.css"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black antialiased">
       <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}

