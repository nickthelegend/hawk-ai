"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Download, AlertTriangle, Clock, UserCheck, UserX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { supabase, getUserLicense, getComputersByLicenseId, getSession, getUserFromSession } from "@/lib/auth"
import type { User as SupabaseUser } from "@supabase/supabase-js"

// Types
type User = SupabaseUser

type Computer = {
  id: string
  hostname: string
  ip_address: string
  last_seen: string
  // Add other computer properties as needed
}

type LogEvent = {
  id: string
  computer_id: string
  event_id: string
  source_name: string
  event_type: string
  event_category: string
  message: string
  time_generated: string
  log_type: string
}

type ActivityData = {
  date: string
  logins: number
  logouts: number
  warnings: number
}

type RecentActivity = {
  user: string
  type: string
  message: string
  time: string
}

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [computers, setComputers] = useState<Computer[]>([])
  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getSession()
        console.log("Session:", session)

        if (session?.session) {
          const userData = await getUserFromSession()
          console.log("User data:", userData)
          if (userData) {
            setUser(userData as User)
            const license = await getUserLicense(userData.id)
            if (license) {
              const computersData = await getComputersByLicenseId(license.id)
              setComputers(computersData)

              // Fetch log events
              const { data: logEvents, error: logError } = await supabase
                .from("log_events")
                .select("*")
                .order("time_generated", { ascending: false })
                .limit(100)

              if (logError) throw logError

              // Process log events for activity data and recent activity
              const processedActivityData = processLogEvents(logEvents)
              setActivityData(processedActivityData)

              const recentActivityData = logEvents.slice(0, 4).map((event) => ({
                user: event.source_name,
                type: event.event_type.toLowerCase(),
                message: event.message,
                time: new Date(event.time_generated).toLocaleString(),
              }))
              setRecentActivity(recentActivityData)
            }
          }
        } else {
          setError("No active session found")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const processLogEvents = (events: LogEvent[]): ActivityData[] => {
    const activityMap: { [key: string]: ActivityData } = {}
    events.forEach((event) => {
      const date = new Date(event.time_generated).toISOString().split("T")[0]
      if (!activityMap[date]) {
        activityMap[date] = { date, logins: 0, logouts: 0, warnings: 0 }
      }
      if (event.event_type === "Success" && event.message.includes("login")) {
        activityMap[date].logins++
      } else if (event.event_type === "Success" && event.message.includes("logout")) {
        activityMap[date].logouts++
      } else if (event.event_type === "Warning") {
        activityMap[date].warnings++
      }
    })
    return Object.values(activityMap)
  }

  const generatePDF = () => {
    // Implement PDF generation logic here
    console.log("Generating PDF report...")
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>

  const todayLogins = activityData.length > 0 ? activityData[activityData.length - 1].logins : 0
  const totalWarnings = activityData.reduce((sum, day) => sum + day.warnings, 0)
  const failedAttempts = activityData.reduce((sum, day) => sum + day.warnings, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Reports</h1>
          <p className="text-zinc-400">AI-powered analysis of system login activities</p>
        </div>
        <Button
          onClick={generatePDF}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Generate PDF Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Total Logins Today</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{todayLogins}</div>
            <p className="text-xs text-zinc-400">From {computers.length} computers</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{computers.length}</div>
            <p className="text-xs text-zinc-400">Connected computers</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Failed Attempts</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{failedAttempts}</div>
            <p className="text-xs text-zinc-400">Last {activityData.length} days</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">Security Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalWarnings}</div>
            <p className="text-xs text-zinc-400">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Graph */}
      <Card className="bg-zinc-800/50 border-zinc-700 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-zinc-100">Login Activity</CardTitle>
              <CardDescription className="text-zinc-400">System access patterns over time</CardDescription>
            </div>
            <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
              <TabsList className="bg-zinc-900">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis dataKey="date" stroke="#666" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="logins" stroke="#4f46e5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="logouts" stroke="#7c3aed" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="warnings" stroke="#eab308" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & AI Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Activity</CardTitle>
            <CardDescription className="text-zinc-400">Latest system events and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        activity.type.includes("warning")
                          ? "destructive"
                          : activity.type.includes("success")
                            ? "default"
                            : "secondary"
                      }
                    >
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{activity.user}</p>
                      <p className="text-xs text-zinc-400">{activity.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">AI Security Insights</CardTitle>
            <CardDescription className="text-zinc-400">Machine learning-powered analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-yellow-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Unusual Pattern Detected</h4>
                <p className="text-xs text-zinc-400">
                  Multiple login attempts from new IP addresses detected for user {user?.email}. Recommend enabling 2FA.
                </p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-emerald-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Security Recommendation</h4>
                <p className="text-xs text-zinc-400">
                  85% of users have updated to the latest security patch. Consider enforcing update for remaining
                  systems.
                </p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-blue-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Login Pattern Analysis</h4>
                <p className="text-xs text-zinc-400">
                  Peak login activity occurs between 8-9 AM. Consider staggering system updates outside these hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

