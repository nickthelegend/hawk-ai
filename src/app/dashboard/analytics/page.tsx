"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Shield, ShieldAlert, Clock, Users, Laptop, Calendar, Download, Filter, RefreshCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, getUserLicense, getComputersByLicenseId, getSession, getUserFromSession } from "@/lib/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { User } from "@supabase/supabase-js"

const COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#db2777"]

interface TimeDistribution {
  name: string
  value: number
}

interface SecurityEvent {
  id: string
  timestamp: string
  type: string
  user: string
  location: string
  severity: "high" | "medium" | "low"
  details: string
  affectedSystems: string[]
}

interface Computer {
  id: string
  hostname: string
  ip_address: string
}

function LoadingSkeletons() {
  return (
    <>
      {/* Key Metrics Skeletons */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-zinc-100 text-sm font-medium">
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Login Time Distribution Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </CardContent>
        </Card>

        {/* Security Events Timeline Skeleton */}
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Skeleton */}
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-lg bg-zinc-900 p-4 border-l-4 border-zinc-700">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full mb-3" />
                <Skeleton className="h-3 w-full mb-3" />
                <Skeleton className="h-8 w-24 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function SecurityEventDetails({
  event,
  isOpen,
  onClose,
}: { event: SecurityEvent | null; isOpen: boolean; onClose: () => void }) {
  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>{event.type}</DialogTitle>
          <DialogDescription>
            <Badge
              variant={
                event.severity === "high" ? "destructive" : event.severity === "medium" ? "default" : "secondary"
              }
            >
              {event.severity}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Timestamp</h4>
            <p className="text-sm text-zinc-400">{new Date(event.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">User</h4>
            <p className="text-sm text-zinc-400">{event.user}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Location</h4>
            <p className="text-sm text-zinc-400">{event.location}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Details</h4>
            <p className="text-sm text-zinc-400">{event.details}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Affected Systems</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400">
              {event.affectedSystems.map((system, index) => (
                <li key={index}>{system}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [securityScore, setSecurityScore] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [connectedDevices, setConnectedDevices] = useState(0)
  const [securityIncidents, setSecurityIncidents] = useState(0)
  const [timeDistributionData, setTimeDistributionData] = useState<TimeDistribution[]>([])
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getSession()
        if (session?.session) {
          const userData = await getUserFromSession()
          if (userData) {
            setUser(userData)

            // Fetch license and computers
            const license = await getUserLicense(userData.id)
            if (license) {
              const computers = await getComputersByLicenseId(license.id)

              // Fetch and process data
              await fetchSecurityMetrics(computers)
              await fetchTimeDistribution(computers)
              await fetchSecurityEvents(computers)
            } else {
              setError("No license found for the user")
            }
          } else {
            setError("User data not found")
          }
        } else {
          setError("No active session found")
        }
      } catch (err) {
        console.error("Data fetching error:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  async function fetchSecurityMetrics(computers: Computer[]) {
    const { data: events, error } = await supabase
      .from("log_events")
      .select("*")
      .in(
        "computer_id",
        computers.map((c) => c.id),
      )
      .gte("time_generated", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (error) throw error

    if (events) {
      const score = calculateSecurityScore(events)
      const activeUserCount = new Set(events.map((e) => e.user)).size
      const deviceCount = new Set(events.map((e) => e.computer_id)).size
      const incidentCount = events.filter((e) => e.event_type === "Error" || e.event_type === "Warning").length

      setSecurityScore(score)
      setActiveUsers(activeUserCount)
      setConnectedDevices(deviceCount)
      setSecurityIncidents(incidentCount)
    }
  }

  async function fetchTimeDistribution(computers: Computer[]) {
    const { data: events, error } = await supabase
      .from("log_events")
      .select("time_generated")
      .in(
        "computer_id",
        computers.map((c) => c.id),
      )
      .gte("time_generated", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (error) throw error

    if (events && events.length > 0) {
      const distribution: Record<string, number> = {
        "Morning (6-12)": 0,
        "Afternoon (12-18)": 0,
        "Evening (18-24)": 0,
        "Night (0-6)": 0,
      }

      events.forEach((event) => {
        const hour = new Date(event.time_generated).getHours()
        if (hour >= 6 && hour < 12) distribution["Morning (6-12)"]++
        else if (hour >= 12 && hour < 18) distribution["Afternoon (12-18)"]++
        else if (hour >= 18 && hour < 24) distribution["Evening (18-24)"]++
        else distribution["Night (0-6)"]++
      })

      setTimeDistributionData(Object.entries(distribution).map(([name, value]) => ({ name, value })))
    } else {
      setTimeDistributionData([])
    }
  }

  async function fetchSecurityEvents(computers: Computer[]) {
    const { data: events, error } = await supabase
      .from("chainsaw_logs")
      .select("*")
      .in(
        "computer_id",
        computers.map((c) => c.id),
      )
      .order("timestamp", { ascending: false })
      .limit(3)

    if (error) throw error

    if (events) {
      setSecurityEvents(
        events.map((event) => ({
          id: event.id,
          timestamp: event.timestamp,
          type: event.name,
          user: event.event_data?.TargetUserName || "Unknown",
          location: event.event_data?.IpAddress || "Unknown",
          severity: event.level as "high" | "medium" | "low",
          details: event.event_data?.Description || "No additional details available",
          affectedSystems: event.event_data?.AffectedSystems || [],
        })),
      )
    }
  }

  function calculateSecurityScore(events: any[]): number {
    const totalEvents = events.length
    if (totalEvents === 0) return 100 // If no events, assume perfect score

    const errorEvents = events.filter((e) => e.event_type === "Error").length
    const warningEvents = events.filter((e) => e.event_type === "Warning").length

    const score = 100 - (errorEvents * 5 + warningEvents * 2) / totalEvents
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  if (loading) return <LoadingSkeletons />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Analytics</h1>
          <p className="text-zinc-400">Advanced AI-powered security log analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all-users">
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-users">All Users</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
              <SelectItem value="standard">Standard Users</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{securityScore}%</div>
            <p className="text-xs text-zinc-400">Based on recent events</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeUsers}</div>
            <p className="text-xs text-zinc-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Connected Devices</CardTitle>
            <Laptop className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{connectedDevices}</div>
            <p className="text-xs text-zinc-400">Active connections</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Security Incidents</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{securityIncidents}</div>
            <p className="text-xs text-zinc-400">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Login Time Distribution */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Login Time Distribution</CardTitle>
            <CardDescription className="text-zinc-400">
              Analysis of login patterns across different time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {timeDistributionData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={timeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "6px",
                      }}
                    />
                  </PieChart>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-zinc-400">No data available</p>
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Security Events Timeline</CardTitle>
            <CardDescription className="text-zinc-400">Recent security-related events and incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 cursor-pointer hover:bg-zinc-700 transition-colors"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        event.severity === "high"
                          ? "destructive"
                          : event.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {event.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{event.type}</p>
                      <p className="text-xs text-zinc-400">
                        User: {event.user} | IP: {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <SecurityEventDetails event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>

      {/* AI Insights */}
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-zinc-100">AI-Powered Security Insights</CardTitle>
              <CardDescription className="text-zinc-400">
                Machine learning analysis of system logs and user behavior
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-red-500">
              <h4 className="text-sm font-medium text-zinc-100 mb-2">Critical Pattern Detection</h4>
              <p className="text-xs text-zinc-400 mb-3">
                Multiple failed login attempts detected from unusual IP ranges. Possible brute force attack in progress.
              </p>
              <Button variant="destructive" size="sm">
                Investigate
              </Button>
            </div>
            <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-yellow-500">
              <h4 className="text-sm font-medium text-zinc-100 mb-2">Behavioral Analysis</h4>
              <p className="text-xs text-zinc-400 mb-3">
                User 'john_doe' showing deviation from normal login patterns. 75% confidence of compromised credentials.
              </p>
              <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                Review
              </Button>
            </div>
            <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-green-500">
              <h4 className="text-sm font-medium text-zinc-100 mb-2">System Health</h4>
              <p className="text-xs text-zinc-400 mb-3">
                All security protocols functioning normally. Last system scan completed 2 hours ago with no critical
                findings.
              </p>
              <Button variant="outline" size="sm" className="border-green-500 text-green-500 hover:bg-green-500/10">
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

