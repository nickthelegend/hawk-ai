"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, List, Grid, Search, AlertTriangle, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase, getUserLicense, getComputersByLicenseId, getSession, getUserFromSession } from "@/lib/auth"

interface Computer {
  id: string
  hostname: string
  ip_address: string
  last_seen: string
  created_at: string
  access_key: string | null
}

export default function ComputersPage() {
  const [viewMode, setViewMode] = useState<"list" | "icons">("icons")
  const [searchTerm, setSearchTerm] = useState("")
  const [computers, setComputers] = useState<Computer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null) // Replace 'any' with your User type

  // Fetch session and user
  useEffect(() => {
    (async () => {
      try {
        const session = await getSession();
        console.log("Session:", session);

        if (session?.session) {
          const userData = await getUserFromSession();
          console.log("User data:", userData);
          setUser(userData);
        } else {
          setError("No active session found");
          setLoading(false);
        }
      } catch (err) {
        console.error("Session error:", err);
        setError("Failed to load session");
        setLoading(false);
      }
    })();
  }, []);

  // Fetch computers after user is set
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        console.log("Fetching license for user:", user.id);
        const license = await getUserLicense(user.id);
        
        if (license) {
          console.log("Fetching computers for license ID:", license.id);
          const computersData = await getComputersByLicenseId(license.id);
          setComputers(computersData);
        } else {
          setError("No license found");
        }
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const filteredComputers = computers.filter(
    (computer) =>
      computer.hostname.toLowerCase().includes(searchTerm.toLowerCase()) || computer.ip_address.includes(searchTerm),
  )

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

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
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="icons">
                <Grid className="h-4 w-4 mr-2" />
                Icons
              </TabsTrigger>
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
            <CardDescription className="text-zinc-400">Detailed view of all connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-zinc-300">Hostname</TableHead>
                  <TableHead className="text-zinc-300">IP Address</TableHead>
                  <TableHead className="text-zinc-300">Last Seen</TableHead>
                  <TableHead className="text-zinc-300">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComputers.map((computer) => (
                  <TableRow key={computer.id}>
                    <TableCell className="font-medium text-white">{computer.hostname}</TableCell>
                    <TableCell className="text-zinc-300">{computer.ip_address}</TableCell>
                    <TableCell className="text-zinc-300">{new Date(computer.last_seen).toLocaleString()}</TableCell>
                    <TableCell className="text-zinc-300">{new Date(computer.created_at).toLocaleString()}</TableCell>
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
                  {computer.hostname}
                  <Monitor className="h-5 w-5 text-green-500" />
                </CardTitle>
                <CardDescription className="text-zinc-400">{computer.ip_address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Last Seen:</span>
                    <span className="text-zinc-300">{new Date(computer.last_seen).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Created At:</span>
                    <span className="text-zinc-300">{new Date(computer.created_at).toLocaleString()}</span>
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

