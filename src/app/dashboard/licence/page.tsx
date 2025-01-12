"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Shield, CreditCard, AlertTriangle, Download, RefreshCw, Zap } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample data - replace with real data from your backend
const licenseInfo = {
  plan: "Enterprise",
  totalLicenses: 100,
  usedLicenses: 78,
  expiryDate: "2024-12-31",
  paymentDue: 2499.99,
  nextBillingDate: "2024-02-01",
}

const connectedComputers = [
  { id: 1, name: "WS-001", lastActive: "2024-01-11 08:30:15", usageHours: 156 },
  { id: 2, name: "WS-002", lastActive: "2024-01-10 17:45:22", usageHours: 142 },
  { id: 3, name: "WS-003", lastActive: "2024-01-11 09:15:07", usageHours: 168 },
  { id: 4, name: "WS-004", lastActive: "2024-01-11 07:55:30", usageHours: 135 },
  { id: 5, name: "WS-005", lastActive: "2024-01-09 16:20:11", usageHours: 120 },
]

const usageData = [
  { name: 'Mon', usage: 80 },
  { name: 'Tue', usage: 75 },
  { name: 'Wed', usage: 85 },
  { name: 'Thu', usage: 70 },
  { name: 'Fri', usage: 90 },
  { name: 'Sat', usage: 50 },
  { name: 'Sun', usage: 40 },
]

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#db2777']

export default function LicencePage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">License Management</h1>
          <p className="text-zinc-400">Monitor and manage your software licenses</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-lg font-medium">
              License Plan
            </CardTitle>
            <Shield className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{licenseInfo.plan}</div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Licenses Used:</span>
              <span className="text-white font-semibold">{licenseInfo.usedLicenses} / {licenseInfo.totalLicenses}</span>
            </div>
            <Progress 
              value={(licenseInfo.usedLicenses / licenseInfo.totalLicenses) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-zinc-400 mt-2">Expires on {licenseInfo.expiryDate}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-lg font-medium">
              Payment Due
            </CardTitle>
            <CreditCard className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">${licenseInfo.paymentDue.toFixed(2)}</div>
            <p className="text-xs text-zinc-400">Next billing date: {licenseInfo.nextBillingDate}</p>
            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
              Pay Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-zinc-100 text-lg font-medium">
              AI Insights
            </CardTitle>
            <Zap className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-zinc-300">
                <span className="font-semibold text-yellow-500">78%</span> license utilization this month.
              </p>
              <p className="text-sm text-zinc-300">
                Peak usage on <span className="font-semibold text-yellow-500">Wednesdays</span>.
              </p>
              <p className="text-sm text-zinc-300">
                <span className="font-semibold text-yellow-500">5</span> inactive licenses detected.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
              View Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">License Usage Distribution</CardTitle>
            <CardDescription className="text-zinc-400">
              Breakdown of license usage across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'IT', value: 35 },
                      { name: 'Sales', value: 25 },
                      { name: 'Marketing', value: 20 },
                      { name: 'HR', value: 10 },
                      { name: 'Others', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {
                      [
                        { name: 'IT', value: 35 },
                        { name: 'Sales', value: 25 },
                        { name: 'Marketing', value: 20 },
                        { name: 'HR', value: 10 },
                        { name: 'Others', value: 10 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))
                    }
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-zinc-100">Weekly Usage Trend</CardTitle>
                <CardDescription className="text-zinc-400">
                  License usage patterns over the past week
                </CardDescription>
              </div>
              <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
                <TabsList className="bg-zinc-900">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="usage" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-zinc-100">Connected Computers</CardTitle>
          <CardDescription className="text-zinc-400">
            Devices currently using the software license
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-zinc-300">Computer Name</TableHead>
                <TableHead className="text-zinc-300">Last Active</TableHead>
                <TableHead className="text-zinc-300">Usage Hours</TableHead>
                <TableHead className="text-zinc-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connectedComputers.map((computer) => (
                <TableRow key={computer.id}>
                  <TableCell className="font-medium text-white">{computer.name}</TableCell>
                  <TableCell className="text-zinc-300">{computer.lastActive}</TableCell>
                  <TableCell className="text-zinc-300">{computer.usageHours} hours</TableCell>
                  <TableCell>
                    <Badge variant={computer.usageHours > 150 ? "default" : "secondary"}>
                      {computer.usageHours > 150 ? "High Usage" : "Normal"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

