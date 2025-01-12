"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Send, Bot, HelpCircle, FileText, ShieldAlert } from "lucide-react";

// This is a mock function to simulate AI responses. Replace with actual AI integration.
const getAIResponse = async (message: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (message.toLowerCase().includes("log")) {
    return "Logs are records of events and activities on your computer system. They can include login attempts, software installations, system errors, and more. Analyzing logs helps identify security threats and system issues.";
  } else if (message.toLowerCase().includes("vulnerable")) {
    return "Vulnerable sources in cybersecurity refer to potential weak points in a system that could be exploited by attackers. Common vulnerabilities include outdated software, weak passwords, unpatched systems, and misconfigured security settings.";
  } else {
    return "I'm here to help with any questions about cybersecurity, logs, and system vulnerabilities. What would you like to know more about?";
  }
};

type Message = {
  content: string;
  sender: "user" | "ai";
};

export default function HelpPage() {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I assist you with cybersecurity today?", sender: "ai" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessages: Message[] = [...messages, { content: inputMessage, sender: "user" }];
    setMessages(newMessages);
    setInputMessage("");

    const aiResponse = await getAIResponse(inputMessage);
    setMessages([...newMessages, { content: aiResponse, sender: "ai" }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Help & Support</h1>
        <p className="text-zinc-400">Get assistance and learn more about cybersecurity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-zinc-800/50 border-zinc-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-zinc-100">AI Assistant</CardTitle>
            <CardDescription className="text-zinc-400">
              Chat with our AI to get instant answers about cybersecurity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4 p-4 rounded-md bg-zinc-900/50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-700 text-zinc-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your question here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-zinc-700 text-white border-zinc-600"
              />
              <Button onClick={handleSendMessage} className="bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-2 text-zinc-300 hover:text-white">
                  <FileText className="h-4 w-4" />
                  <span>User Manual</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-zinc-300 hover:text-white">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Security Best Practices</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-zinc-300 hover:text-white">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </a>
              </nav>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basics">
                <TabsList className="bg-zinc-900">
                  <TabsTrigger value="basics">Basics</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="basics" className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-zinc-300 hover:text-white"
                  >
                    <Bot className="h-4 w-4" />
                    <span>Getting Started with AI Analysis</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-zinc-300 hover:text-white"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Understanding Log Files</span>
                  </a>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-zinc-300 hover:text-white"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    <span>Advanced Threat Detection</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-zinc-300 hover:text-white"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Customizing Security Rules</span>
                  </a>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
