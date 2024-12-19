import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-gray-400">Here's an overview of your security posture</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 text-white border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">329</div>
            <p className="text-xs text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 text-white border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-gray-400">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 text-white border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-gray-400">+4.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 text-white border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-gray-400">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Add more dashboard content here as needed */}
    </div>
  )
}

