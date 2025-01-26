"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, Square, Shield, Clock, AlertTriangle, Users, Upload, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Audiowide } from "next/font/google"
import { supabase, getUserFromSession, getUserLicense, getComputersByLicenseId } from "@/lib/auth"

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
})

type Message = {
  content: string
  sender: "user" | "ai"
  threadMark?: string
}

type Thread = {
  id: string
  title: string
  active?: boolean
}

type Computer = {
  id: string
  hostname: string
  access_key: string
}

const SECURITY_FEATURES = [
  {
    icon: Clock,
    title: "Login Time Analysis",
    description: "Track and analyze user login/logout patterns",
    color: "blue",
  },
  {
    icon: AlertTriangle,
    title: "Security Warnings",
    description: "Detect and alert suspicious activities",
    color: "amber",
  },
  {
    icon: Users,
    title: "User Sessions",
    description: "Monitor active user sessions and duration",
    color: "emerald",
  },
  {
    icon: Shield,
    title: "Security Reports",
    description: "Automated email summaries and alerts",
    color: "purple",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your Windows Security Assistant. Please select a computer to begin the analysis.",
      sender: "ai",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [xmlContent, setXmlContent] = useState<string | null>(null)
  const [threads, setThreads] = useState<Thread[]>([
    { id: "1", title: "Login Analysis", active: true },
    { id: "2", title: "Threat Analysis" },
  ])
  const [computers, setComputers] = useState<Computer[]>([])
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null)
  const [securityLogs, setSecurityLogs] = useState<string[]>([])
  const [threatLogs, setThreatLogs] = useState<string[]>([])
  const [threatLogContent, setThreatLogContent] = useState<string | null>(null) // Added state for threat log content
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchUserComputers()
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  const fetchUserComputers = async () => {
    try {
      console.log("Fetching user computers...")
      const user = await getUserFromSession()
      if (user) {
        console.log("User found:", user.id)
        const license = await getUserLicense(user.id)
        if (license) {
          console.log("License found:", license.id)
          const computersData = await getComputersByLicenseId(license.id)
          console.log("Computers fetched:", computersData)
          setComputers(computersData)
        } else {
          console.log("No license found for user")
        }
      } else {
        console.log("No user found in session")
      }
    } catch (error) {
      console.error("Error fetching user computers:", error)
    }
  }

  const fetchLogs = async (computer: Computer, logType: "security" | "threat") => {
    try {
      console.log(`Fetching ${logType} logs for computer:`, computer.hostname)
      if (logType === "security") {
        const path = `windows-logs/logs/${computer.access_key}/Security.xml`
        console.log("Fetching security log from path:", path)
        const { data, error } = await supabase.storage.from("public").download(path)
        if (error) throw error
        const text = await data.text()
        setXmlContent(text) // Set the XML content here
        console.log("Security XML file loaded successfully")
        setMessages((prev) => [
          ...prev,
          {
            content: "Security XML file loaded successfully. You can now ask questions about its content.",
            sender: "ai",
          },
        ])
      } else {
        const path = `chainsaw_logs/${computer.access_key}/`
        console.log("Fetching threat logs from path:", path)
        const { data, error } = await supabase.storage.from("chainsaw-results").list(path)
        if (error) throw error
        console.log("Threat logs data:", data)
        const jsonFiles = data.filter((file) => file.name.endsWith(".json")).map((file) => file.name)
        console.log("Filtered JSON files:", jsonFiles)
        if (jsonFiles.length === 0) {
          console.log("No JSON files found in the specified path")
          toast({
            title: "No threat logs found",
            description: "There are no threat analysis logs available for this computer.",
            variant: "destructive",
          })
        }
        setThreatLogs(jsonFiles)
      }
    } catch (error) {
      console.error(`Error fetching ${logType} logs:`, error)
      toast({
        title: `Error fetching ${logType} logs`,
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const fetchJsonContent = async (computer: Computer, fileName: string) => {
    try {
      const path = `chainsaw-results/chainsaw_logs/${computer.access_key}/${fileName}`
      console.log("Fetching JSON content from path:", path)
      const { data, error } = await supabase.storage.from("public").download(path)
      if (error) throw error
      const jsonContent = await data.text()
      console.log("JSON content loaded successfully")
      setThreatLogContent(jsonContent) // Set the JSON content here
      setMessages((prev) => [
        ...prev,
        {
          content: `Threat log "${fileName}" loaded successfully. You can now ask questions about its content.`,
          sender: "ai",
        },
      ])
      toast({
        title: "Threat log loaded",
        description: `${fileName} has been loaded successfully.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error fetching JSON content:", error)
      toast({
        title: "Error loading threat log",
        description: "Failed to load the selected threat log. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleComputerSelect = async (computer: Computer) => {
    console.log("Computer selected:", computer.hostname)
    setSelectedComputer(computer)
    // Only fetch threat logs initially
    await fetchLogs(computer, "threat")
  }

  const handleThreadSelect = async (threadId: string) => {
    console.log("Thread selected:", threadId)
    setThreads(
      threads.map((thread) => ({
        ...thread,
        active: thread.id === threadId,
      })),
    )

    if (selectedComputer) {
      if (threadId === "1") {
        await fetchLogs(selectedComputer, "security")
      } else if (threadId === "2") {
        await fetchLogs(selectedComputer, "threat")
        // Clear previous threat log content when switching to the Threat Analysis thread
        setThreatLogContent(null)
      }
    }
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return

    const activeThread = threads.find((t) => t.active)
    if (!activeThread) {
      toast({
        title: "No thread selected",
        description: "Please select a thread first.",
        variant: "destructive",
      })
      return
    }

    if (activeThread.id === "1" && !xmlContent) {
      toast({
        title: "No security logs loaded",
        description: "Please load security logs first.",
        variant: "destructive",
      })
      return
    }

    if (activeThread.id === "2" && !threatLogContent) {
      toast({
        title: "No threat logs loaded",
        description: "Please load threat logs first.",
        variant: "destructive",
      })
      return
    }

    console.log("Sending message:", inputMessage)
    const newMessages: Message[] = [...messages, { content: inputMessage, sender: "user" }]
    setMessages(newMessages)
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          // Only send the content for the active thread
          ...(activeThread.id === "1" ? { xmlContent } : { jsonContent: threatLogContent }),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      console.log("Response received:", data.response)
      setMessages([...newMessages, { content: data.response, sender: "ai" }])
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#1c2634]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNjAgMzBjMC0xNi41Ny0xMy40My0zMC0zMC0zMFMwIDEzLjQzIDAgMzBzMTMuNDMgMzAgMzAgMzAgMzAtMTMuNDMgMzAtMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto p-4">
            <h1 className={`${audiowide.className} text-4xl text-center text-white mb-8 mt-4`}>HAWK-AI</h1>
            {/* Security Features Cards */}
            {messages.length === 1 && (
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl">
                  {SECURITY_FEATURES.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors group cursor-pointer backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center ring-1 transition-all",
                              feature.color === "blue" &&
                                "bg-blue-600/20 ring-blue-600/30 group-hover:ring-blue-500/50",
                              feature.color === "amber" &&
                                "bg-amber-600/20 ring-amber-600/30 group-hover:ring-amber-500/50",
                              feature.color === "emerald" &&
                                "bg-emerald-600/20 ring-emerald-600/30 group-hover:ring-emerald-500/50",
                              feature.color === "purple" &&
                                "bg-purple-600/20 ring-purple-600/30 group-hover:ring-purple-500/50",
                            )}
                          >
                            <feature.icon
                              className={cn(
                                "h-4 w-4",
                                feature.color === "blue" && "text-blue-500",
                                feature.color === "amber" && "text-amber-500",
                                feature.color === "emerald" && "text-emerald-500",
                                feature.color === "purple" && "text-purple-500",
                              )}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-3 mb-6",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-600/30">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "relative group rounded-2xl px-4 py-3 text-sm max-w-[85%] shadow-lg backdrop-blur-sm",
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 text-gray-100 ring-1 ring-white/10",
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-600/30">
                    <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-3 text-sm text-gray-100 ring-1 ring-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex gap-2">
              <Input
                placeholder="Ask about the security logs..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="bg-gray-800/50 border-0 ring-1 ring-gray-700 text-white placeholder-gray-400 focus-visible:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim() || !selectedComputer}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200",
                  (isLoading || !inputMessage.trim() || !selectedComputer) && "opacity-50 cursor-not-allowed",
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - on the right */}
      <div className="w-80 border-l border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security Threads
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2 space-y-1">
            {computers.map((computer) => (
              <Button
                key={computer.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50",
                  selectedComputer?.id === computer.id && "bg-gray-800/50 text-white",
                )}
                onClick={() => handleComputerSelect(computer)}
              >
                <Square className="h-4 w-4 mr-2" />
                {computer.hostname}
              </Button>
            ))}
            {selectedComputer && (
              <>
                {threads.map((thread) => (
                  <Button
                    key={thread.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50",
                      thread.active && "bg-gray-800/50 text-white",
                    )}
                    onClick={() => handleThreadSelect(thread.id)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {thread.title}
                  </Button>
                ))}
                {threads[1].active &&
                  threatLogs.map((log, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 pl-8"
                      onClick={() => {
                        console.log("Threat log selected:", log)
                        if (selectedComputer) {
                          fetchJsonContent(selectedComputer, log)
                        }
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {log}
                    </Button>
                  ))}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

