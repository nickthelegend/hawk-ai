"use client"
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the paths where Navigation should not appear
  const excludedPaths = ["/dashboard", "/admin", "/settings"];
  
  // Check if the current path matches any excluded path
  const showNavigation = !excludedPaths.some((path) => pathname.startsWith(path));


  const showFooter = !excludedPaths.some((path) => pathname.startsWith(path));


  return (
    <html lang="en">
      <body>
        {showNavigation && <Navigation />}
        {children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}