"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Shield, Server, Network, Container, AlertTriangle, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const entryPointData = [
  { name: "Mon", value1: 150, value2: 20 },
  { name: "Tue", value1: 200, value2: 40 },
  { name: "Wed", value1: 180, value2: 30 },
  { name: "Thu", value1: 250, value2: 45 },
  { name: "Fri", value1: 220, value2: 35 },
  { name: "Sat", value1: 190, value2: 25 },
  { name: "Sun", value1: 210, value2: 38 },
]

const assetMetrics = [
  { name: "Domains", count: 48, total: 124, color: "bg-purple-600" },
  { name: "Subdomains", count: 83, total: 157, color: "bg-orange-600" },
  { name: "IP Addresses", count: 40, total: 152, color: "bg-cyan-600" },
  { name: "Containers", count: 152, total: 238, color: "bg-emerald-600" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-zinc-400">Real-time vulnerability monitoring and analysis</p>
        </div>
        <Tabs defaultValue="last-week">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="last-week">Last Week</TabsTrigger>
            <TabsTrigger value="last-month">Last Month</TabsTrigger>
            <TabsTrigger value="last-year">Last Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Total Assets</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">329</div>
            <p className="text-xs text-zinc-400">+24 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Active Servers</CardTitle>
            <Server className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">245</div>
            <p className="text-xs text-zinc-400">98% uptime</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Network Status</CardTitle>
            <Network className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Stable</div>
            <p className="text-xs text-zinc-400">No active threats</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-zinc-400">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Entry Point Analysis */}
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-zinc-100">Entry Point Analysis</CardTitle>
                <CardDescription className="text-zinc-400">Weekly breakdown of system access points</CardDescription>
              </div>
              <Activity className="h-4 w-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">{metric.name}:</span>
                    <span className="text-zinc-100">
                      {metric.count}/{metric.total}
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-900 rounded-full">
                    <div
                      className={`h-full rounded-full ${metric.color}`}
                      style={{ width: `${(metric.count / metric.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="h-48 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={entryPointData}>
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="value1" fill="#9333ea" />
                    <Bar dataKey="value2" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-zinc-100">Security Status</CardTitle>
                <CardDescription className="text-zinc-400">Real-time system security overview</CardDescription>
              </div>
              <Shield className="h-4 w-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-white">329</div>
                  <div className="text-sm text-zinc-400">Discovered Assets</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Active:</span>
                      <span className="text-zinc-100">245</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Inactive:</span>
                      <span className="text-zinc-100">84</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-white">535</div>
                  <div className="text-sm text-zinc-400">Total Issues</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">Critical</span>
                        <Badge variant="destructive">12%</Badge>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full">
                        <div className="h-full w-[12%] bg-red-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">Medium</span>
                        <Badge variant="default">50%</Badge>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full">
                        <div className="h-full w-[50%] bg-purple-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">Low</span>
                        <Badge variant="secondary">38%</Badge>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full">
                        <div className="h-full w-[38%] bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">System Health</CardTitle>
            <CardDescription className="text-zinc-400">Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["CPU Usage", "Memory", "Storage", "Network"].map((metric) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">{metric}</span>
                    <span className="text-zinc-100">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 rounded-full">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Active Tests</CardTitle>
            <CardDescription className="text-zinc-400">Ongoing security trials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-zinc-100">DOM Clobbering</div>
                <div className="flex gap-1">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className={`h-1 w-full rounded ${i < 4 ? "bg-purple-600" : "bg-zinc-700"}`} />
                    ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-zinc-100">XML Entities</div>
                <div className="flex gap-1">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className={`h-1 w-full rounded ${i < 6 ? "bg-cyan-600" : "bg-zinc-700"}`} />
                    ))}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Configure New Tests
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Alerts</CardTitle>
            <CardDescription className="text-zinc-400">Latest security notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "Critical", message: "Unauthorized access attempt detected" },
                { level: "Warning", message: "System update required" },
                { level: "Info", message: "Backup completed successfully" },
              ].map((alert, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900">
                  <Badge
                    variant={
                      alert.level === "Critical" ? "destructive" : alert.level === "Warning" ? "default" : "secondary"
                    }
                  >
                    {alert.level}
                  </Badge>
                  <span className="text-sm text-zinc-100">{alert.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

