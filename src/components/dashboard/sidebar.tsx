"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BarChart2, FileText, Settings, HelpCircle, LogOut, Monitor, Key } from 'lucide-react'
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout, supabase } from "@/lib/auth"

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Monitor, label: "Computers", href: "/dashboard/computers" },
  { icon: Key, label: "Licence", href: "/dashboard/licence" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
]

export function Sidebar() {
  const router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear session storage and cookie
    sessionStorage.removeItem('supabase.auth.token');
    document.cookie = 'supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Redirect to the login page
    router.push('/login');
  }

  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col bg-zinc-950 shadow-xl">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-zinc-800/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <span className="text-lg font-bold text-white">H</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-2 p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <div className="absolute left-14 hidden rounded-md bg-zinc-900 px-2 py-1 text-sm text-white group-hover:block">
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="flex flex-col items-center gap-2 border-t border-zinc-800/50 p-2">
        <button
          onClick={() => logout()}
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <div className="absolute left-14 hidden rounded-md bg-zinc-900 px-2 py-1 text-sm text-white group-hover:block">
            Sign out
          </div>
        </button>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/01.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

