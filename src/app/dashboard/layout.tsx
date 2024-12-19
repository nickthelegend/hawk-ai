import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black">
      
      <Sidebar />
      <main className="flex-1 pl-16">{children}</main>
    </div>
  )
}

