"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

export function Navigation() {
  const navigationItems = [
    { name: "Company", href: "/company" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Contacts", href: "/contacts" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2 px-0 text-white hover:bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-black text-white">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium hover:text-gray-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">HawkAI</span>
          </Link>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-gray-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="default">
              Login
            </Button>
          </Link>
          <Link href="/signup" className="hidden sm:block">
            <Button className="bg-white text-black hover:bg-gray-200">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

