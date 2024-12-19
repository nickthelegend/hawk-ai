"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const entryPointData = [
  { name: 'Mon', value1: 150, value2: 20 },
  { name: 'Tue', value1: 200, value2: 40 },
  { name: 'Wed', value1: 180, value2: 30 },
  { name: 'Thu', value1: 250, value2: 45 },
  { name: 'Fri', value1: 220, value2: 35 },
  { name: 'Sat', value1: 190, value2: 25 },
  { name: 'Sun', value1: 210, value2: 38 },
]

export default function DashboardPage() {
  return (
    <div className="p-6 bg-black text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vulnerability overview</h1>
        <Tabs defaultValue="last-week">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="last-week">last week</TabsTrigger>
            <TabsTrigger value="last-month">last month</TabsTrigger>
            <TabsTrigger value="last-year">last year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Entry Point Breakdown */}
        <Card className="bg-zinc-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">entry point breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">domains:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">0</span>
                  <div className="w-32 h-2 bg-purple-600 rounded"></div>
                  <span className="text-sm">124</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">subdomains:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">83</span>
                  <div className="w-32 h-2 bg-orange-600 rounded"></div>
                  <span className="text-sm">157</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">IP addresses:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">40</span>
                  <div className="w-32 h-2 bg-cyan-600 rounded"></div>
                  <span className="text-sm">0</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Containers:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">152</span>
                  <div className="w-32 h-2 bg-cyan-600 rounded"></div>
                  <span className="text-sm">238</span>
                </div>
              </div>
              
              <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={entryPointData}>
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Bar dataKey="value1" fill="#9333ea" />
                    <Bar dataKey="value2" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Assets */}
        <Card className="bg-zinc-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">main assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold">329</div>
                <div className="text-sm text-gray-400">discovered assets</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">domains:</span>
                    <span className="text-sm">48</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">subdomains:</span>
                    <span className="text-sm">5</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">245</div>
                <div className="text-sm text-gray-400">unable to verify</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">IP addresses:</span>
                    <span className="text-sm">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">IP ranges:</span>
                    <span className="text-sm">40</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {/* Reporting */}
        <Card className="bg-zinc-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">reporting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold">62</div>
                <div className="text-sm text-gray-400">generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold">53</div>
                <div className="text-sm text-gray-400">processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold">16</div>
                <div className="text-sm text-gray-400">sent to compliance</div>
              </div>
              <div>
                <div className="text-4xl font-bold">9</div>
                <div className="text-sm text-gray-400">pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ongoing Trials */}
        <Card className="bg-zinc-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">ongoing trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm mb-2">DOM clobbering</div>
                <div className="flex gap-1">
                  {Array(10).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full rounded ${
                        i < 4 ? 'bg-purple-600' : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm mb-2">XML entities</div>
                <div className="flex gap-1">
                  {Array(10).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full rounded ${
                        i < 6 ? 'bg-cyan-600' : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                configure new tests
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Issues Total */}
        <Card className="bg-zinc-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium">535 issues total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>low</span>
                  <span>20%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded">
                  <div className="h-full w-[20%] bg-green-500 rounded" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>medium</span>
                  <span>50%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded">
                  <div className="h-full w-[50%] bg-purple-600 rounded" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>critical</span>
                  <span>12%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded">
                  <div className="h-full w-[12%] bg-red-500 rounded" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

