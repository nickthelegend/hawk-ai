"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, List, Grid, Search, AlertTriangle, Clock, Download } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample data - replace with real data from your backend
const computers = [
  { id: 1, name: "WS-001", ipAddress: "192.168.1.100", macAddress: "00:1A:2B:3C:4D:5E", status: "online", lastLogin: "2024-01-11 08:30:15", warnings: 0 },
  { id: 2, name: "WS-002", ipAddress: "192.168.1.101", macAddress: "00:2B:3C:4D:5E:6F", status: "offline", lastLogin: "2024-01-10 17:45:22", warnings: 2 },
  { id: 3, name: "WS-003", ipAddress: "192.168.1.102", macAddress: "00:3C:4D:5E:6F:7G", status: "online", lastLogin: "2024-01-11 09:15:07", warnings: 1 },
  { id: 4, name: "WS-004", ipAddress: "192.168.1.103", macAddress: "00:4D:5E:6F:7G:8H", status: "online", lastLogin: "2024-01-11 07:55:30", warnings: 0 },
  { id: 5, name: "WS-005", ipAddress: "192.168.1.104", macAddress: "00:5E:6F:7G:8H:9I", status: "offline", lastLogin: "2024-01-09 16:20:11", warnings: 3 },
]

export default function ComputersPage() {
  const [viewMode, setViewMode] = useState<"list" | "icons">("icons")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComputers = computers.filter(computer =>
    computer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    computer.ipAddress.includes(searchTerm) ||
    computer.macAddress.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Connected Computers</h1>
          <p className="text-zinc-400">Monitor and manage Windows 10/11 devices</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-500" />
            <Input
              type="text"
              placeholder="Search computers..."
              className="pl-8 bg-zinc-800 border-zinc-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "list" | "icons")}>
            <TabsList className="bg-zinc-800">
              <TabsTrigger value="list"><List className="h-4 w-4 mr-2" />List</TabsTrigger>
              <TabsTrigger value="icons"><Grid className="h-4 w-4 mr-2" />Icons</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Computer List</CardTitle>
            <CardDescription className="text-zinc-400">
              Detailed view of all connected devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-zinc-300">Name</TableHead>
                  <TableHead className="text-zinc-300">IP Address</TableHead>
                  <TableHead className="text-zinc-300">MAC Address</TableHead>
                  <TableHead className="text-zinc-300">Status</TableHead>
                  <TableHead className="text-zinc-300">Last Login</TableHead>
                  <TableHead className="text-zinc-300">Warnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComputers.map((computer) => (
                  <TableRow key={computer.id}>
                    <TableCell className="font-medium text-white">{computer.name}</TableCell>
                    <TableCell className="text-zinc-300">{computer.ipAddress}</TableCell>
                    <TableCell className="text-zinc-300">{computer.macAddress}</TableCell>
                    <TableCell>
                      <Badge variant={computer.status === "online" ? "default" : "secondary"}>
                        {computer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-300">{computer.lastLogin}</TableCell>
                    <TableCell>
                      {computer.warnings > 0 ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {computer.warnings}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-zinc-400 border-zinc-600">
                          None
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredComputers.map((computer) => (
            <Card key={computer.id} className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-100 flex items-center justify-between">
                  {computer.name}
                  <Monitor className={`h-5 w-5 ${computer.status === "online" ? "text-green-500" : "text-zinc-500"}`} />
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  {computer.ipAddress}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">MAC Address:</span>
                    <span className="text-zinc-300">{computer.macAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Last Login:</span>
                    <span className="text-zinc-300">{computer.lastLogin}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Warnings:</span>
                    {computer.warnings > 0 ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {computer.warnings}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-zinc-400 border-zinc-600">
                        None
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

