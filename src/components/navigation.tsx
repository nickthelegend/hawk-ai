"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  
  const navigationItems = [
    { name: "Download", href: "/download" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Contacts", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 px-0 text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[300px] bg-black/95 backdrop-blur-xl border-white/10"
            >
              <div className="flex flex-col space-y-6">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-white">HawkAI</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white",
                        pathname === item.href && "text-white",
                        "after:absolute after:inset-y-0 after:left-0 after:w-[2px] after:bg-gradient-to-b after:from-purple-500 after:to-pink-500 after:opacity-0 after:transition-opacity hover:after:opacity-100",
                        pathname === item.href && "after:opacity-100"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col space-y-4 px-4">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
              HawkAI
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium text-gray-300 rounded-full transition-colors hover:text-white hover:bg-white/5",
                pathname === item.href && "text-white bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/5"
            asChild
          >
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button 
            className="hidden sm:inline-flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            asChild
          >
            <Link href="/signup">
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

