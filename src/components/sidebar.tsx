"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, Users, Settings, HelpCircle, LogOut } from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard/projects" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r border-gray-800 bg-black">
      <div className="flex h-14 items-center border-b border-gray-800 px-4">
        <Link href="/dashboard" className="font-bold text-white">
          HawkAI
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white">
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  )
}

