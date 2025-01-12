"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  ResponsiveContainer, Tooltip, PieChart, Pie, Cell 
} from 'recharts'
import { Shield, ShieldAlert, Clock, Users, Laptop, Calendar, Download, Filter, RefreshCcw } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample data
const timeDistributionData = [
  { name: "Morning (6-12)", value: 35 },
  { name: "Afternoon (12-18)", value: 40 },
  { name: "Evening (18-24)", value: 20 },
  { name: "Night (0-6)", value: 5 },
]

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#db2777']

const securityEvents = [
  {
    timestamp: "2024-01-11 14:23:45",
    type: "Brute Force Attempt",
    user: "system_admin",
    location: "192.168.1.100",
    severity: "high"
  },
  {
    timestamp: "2024-01-11 14:20:12",
    type: "Multiple Failed Logins",
    user: "john_doe",
    location: "192.168.1.105",
    severity: "medium"
  },
  {
    timestamp: "2024-01-11 14:15:33",
    type: "Unusual Login Time",
    user: "alice_smith",
    location: "192.168.1.110",
    severity: "low"
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("24h")

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
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85%</div>
            <p className="text-xs text-zinc-400">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">124</div>
            <p className="text-xs text-zinc-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Connected Devices
            </CardTitle>
            <Laptop className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">89</div>
            <p className="text-xs text-zinc-400">Active connections</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-sm font-medium">
              Security Incidents
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
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
                      backgroundColor: '#18181b', 
                      border: '1px solid #27272a',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Security Events Timeline</CardTitle>
            <CardDescription className="text-zinc-400">
              Recent security-related events and incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-900"
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
                    <span className="text-xs text-zinc-500">{event.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              <p className="text-xs text-zinc-400 mb-3">Multiple failed login attempts detected from unusual IP ranges. Possible brute force attack in progress.</p>
              <Button variant="destructive" size="sm">
                Investigate
              </Button>
            </div>
            <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-yellow-500">
              <h4 className="text-sm font-medium text-zinc-100 mb-2">Behavioral Analysis</h4>
              <p className="text-xs text-zinc-400 mb-3">User 'john_doe' showing deviation from normal login patterns. 75% confidence of compromised credentials.</p>
              <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                Review
              </Button>
            </div>
            <div className="rounded-lg bg-zinc-900 p-4 border-l-4 border-green-500">
              <h4 className="text-sm font-medium text-zinc-100 mb-2">System Health</h4>
              <p className="text-xs text-zinc-400 mb-3">All security protocols functioning normally. Last system scan completed 2 hours ago with no critical findings.</p>
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

