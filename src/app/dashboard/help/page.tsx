"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Square, Shield, Clock, AlertTriangle, Users, Upload } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Audiowide } from 'next/font/google'

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'],
})

type Message = {
  content: string;
  sender: "user" | "ai";
  threadMark?: string;
};

type Thread = {
  id: string;
  title: string;
  active?: boolean;
};

const SECURITY_FEATURES = [
  { 
    icon: Clock, 
    title: "Login Time Analysis", 
    description: "Track and analyze user login/logout patterns",
    color: "blue" 
  },
  { 
    icon: AlertTriangle, 
    title: "Security Warnings", 
    description: "Detect and alert suspicious activities",
    color: "amber"
  },
  { 
    icon: Users, 
    title: "User Sessions", 
    description: "Monitor active user sessions and duration",
    color: "emerald"
  },
  { 
    icon: Shield, 
    title: "Security Reports", 
    description: "Automated email summaries and alerts",
    color: "purple"
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Hello! I'm your Windows Security Assistant. Please upload an XML file to begin the analysis.",
      sender: "ai"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([
    { id: "1", title: "Login Analysis", active: true },
    { id: "2", title: "Security Warnings" },
    { id: "3", title: "User Sessions" },
    { id: "4", title: "Email Reports" },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      setXmlContent(content);
      toast({
        title: "XML file uploaded",
        description: "You can now ask questions about the XML content.",
      });
      setMessages(prev => [...prev, { content: "XML file uploaded successfully. You can now ask questions about its content.", sender: "ai" }]);
    };
    reader.readAsText(file);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;
    if (!xmlContent) {
      toast({
        title: "No XML file",
        description: "Please upload an XML file first.",
        variant: "destructive",
      });
      return;
    }

    const newMessages: Message[] = [...messages, { content: inputMessage, sender: "user" }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          xmlContent: xmlContent,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages([...newMessages, { content: data.response, sender: "ai" }]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1c2634]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNjAgMzBjMC0xNi41Ny0xMy40My0zMC0zMC0zMFMwIDEzLjQzIDAgMzBzMTMuNDMgMzAgMzAgMzAgMzAtMTMuNDMgMzAtMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
        
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto p-4">
            <h1 className={`${audiowide.className} text-4xl text-center text-white mb-8 mt-4`}>
              HAWK-AI
            </h1>
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
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center ring-1 transition-all",
                            feature.color === "blue" && "bg-blue-600/20 ring-blue-600/30 group-hover:ring-blue-500/50",
                            feature.color === "amber" && "bg-amber-600/20 ring-amber-600/30 group-hover:ring-amber-500/50",
                            feature.color === "emerald" && "bg-emerald-600/20 ring-emerald-600/30 group-hover:ring-emerald-500/50",
                            feature.color === "purple" && "bg-purple-600/20 ring-purple-600/30 group-hover:ring-purple-500/50"
                          )}>
                            <feature.icon className={cn(
                              "h-4 w-4",
                              feature.color === "blue" && "text-blue-500",
                              feature.color === "amber" && "text-amber-500",
                              feature.color === "emerald" && "text-emerald-500",
                              feature.color === "purple" && "text-purple-500"
                            )} />
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
                    message.sender === "user" ? "justify-end" : "justify-start"
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
                        : "bg-white/5 text-gray-100 ring-1 ring-white/10"
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
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-800/50 hover:bg-gray-700/50 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload XML
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".xml"
                className="hidden"
              />
              <Input
                placeholder="Ask about the XML content..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="bg-gray-800/50 border-0 ring-1 ring-gray-700 text-white placeholder-gray-400 focus-visible:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200",
                  (isLoading || !inputMessage.trim()) && "opacity-50 cursor-not-allowed"
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
            {threads.map((thread) => (
              <Button
                key={thread.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50",
                  thread.active && "bg-gray-800/50 text-white"
                )}
              >
                <Square className="h-4 w-4 mr-2" />
                {thread.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

