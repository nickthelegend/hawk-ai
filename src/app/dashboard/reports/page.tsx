"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Download, AlertTriangle, Clock, UserCheck, UserX } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Sample data - replace with real data from your backend
const activityData = [
  { date: '2024-01-05', logins: 45, logouts: 42, warnings: 2 },
  { date: '2024-01-06', logins: 38, logouts: 35, warnings: 1 },
  { date: '2024-01-07', logins: 52, logouts: 48, warnings: 3 },
  { date: '2024-01-08', logins: 41, logouts: 39, warnings: 0 },
  { date: '2024-01-09', logins: 47, logouts: 45, warnings: 4 },
  { date: '2024-01-10', logins: 54, logouts: 51, warnings: 2 },
  { date: '2024-01-11', logins: 49, logouts: 47, warnings: 1 },
]

const recentActivity = [
  {
    user: "john.doe",
    type: "warning",
    message: "Multiple failed login attempts",
    time: "2 minutes ago"
  },
  {
    user: "alice.smith",
    type: "login",
    message: "Successful login from new device",
    time: "15 minutes ago"
  },
  {
    user: "bob.wilson",
    type: "logout",
    message: "Session ended",
    time: "1 hour ago"
  },
  {
    user: "emma.brown",
    type: "warning",
    message: "Unusual login location detected",
    time: "2 hours ago"
  }
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("week")

  const generatePDF = () => {
    // Implement PDF generation logic here
    console.log("Generating PDF report...")
  }

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
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Total Logins Today
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">247</div>
            <p className="text-xs text-zinc-400">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Active Sessions
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">182</div>
            <p className="text-xs text-zinc-400">Active in last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Failed Attempts
            </CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-zinc-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Security Warnings
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
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
              <CardDescription className="text-zinc-400">
                System access patterns over time
              </CardDescription>
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
                <XAxis 
                  dataKey="date" 
                  stroke="#666" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    border: '1px solid #27272a',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="logins" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="logouts" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="warnings" 
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={false}
                />
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
            <CardDescription className="text-zinc-400">
              Latest system events and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        activity.type === "warning" 
                          ? "destructive" 
                          : activity.type === "login" 
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
            <CardDescription className="text-zinc-400">
              Machine learning-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-yellow-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Unusual Pattern Detected</h4>
                <p className="text-xs text-zinc-400">Multiple login attempts from new IP addresses detected for user john.doe. Recommend enabling 2FA.</p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-emerald-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Security Recommendation</h4>
                <p className="text-xs text-zinc-400">85% of users have updated to the latest security patch. Consider enforcing update for remaining systems.</p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-blue-500">
                <h4 className="text-sm font-medium text-zinc-100 mb-1">Login Pattern Analysis</h4>
                <p className="text-xs text-zinc-400">Peak login activity occurs between 8-9 AM. Consider staggering system updates outside these hours.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

