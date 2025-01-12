"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Save, Mail, Shield, Clock, Database, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [aiSensitivity, setAiSensitivity] = useState(50)
  const [logRetention, setLogRetention] = useState("30")

  const handleSaveSettings = () => {
    // Implement save functionality here
    console.log("Settings saved")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400">Configure your cybersecurity tool preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-zinc-800/50 border-zinc-700">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">General Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Manage your account and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-zinc-300">Username</Label>
                <Input id="username" placeholder="Your username" className="bg-zinc-700 text-white border-zinc-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input id="email" type="email" placeholder="Your email" className="bg-zinc-700 text-white border-zinc-600" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor" className="text-zinc-300">Enable Two-Factor Authentication</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Notification Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Manage how you receive alerts and summaries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
                <Label htmlFor="email-notifications" className="text-zinc-300">Enable Email Notifications</Label>
              </div>
              {emailNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="summary-frequency" className="text-zinc-300">Summary Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="alert-threshold" className="text-zinc-300">Alert Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (All alerts)</SelectItem>
                    <SelectItem value="medium">Medium (Important alerts)</SelectItem>
                    <SelectItem value="high">High (Critical alerts only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">AI Analysis Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Configure how the AI analyzes your system logs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-sensitivity" className="text-zinc-300">AI Sensitivity</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="ai-sensitivity"
                    min={0}
                    max={100}
                    step={1}
                    value={[aiSensitivity]}
                    onValueChange={(value) => setAiSensitivity(value[0])}
                    className="flex-1"
                  />
                  <span className="text-zinc-300 w-12 text-center">{aiSensitivity}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysis-frequency" className="text-zinc-300">Analysis Frequency</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="learn-patterns" />
                <Label htmlFor="learn-patterns" className="text-zinc-300">Enable AI Learning from User Patterns</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Data Management</CardTitle>
              <CardDescription className="text-zinc-400">
                Control how your log data is stored and managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="log-retention" className="text-zinc-300">Log Retention Period</Label>
                <Select value={logRetention} onValueChange={setLogRetention}>
                  <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="data-encryption" />
                <Label htmlFor="data-encryption" className="text-zinc-300">Enable Data Encryption at Rest</Label>
              </div>
              <div className="pt-4">
                <Button variant="destructive">
                  Clear All Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

