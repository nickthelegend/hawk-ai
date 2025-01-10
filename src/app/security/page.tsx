"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Shield, Lock, RefreshCw, Zap, Wifi } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: Shield, text: "Real-time threat detection" },
  { icon: Lock, text: "Firewall protection" },
  { icon: RefreshCw, text: "Secure online banking" },
  { icon: Zap, text: "Anti-ransomware" },
  { icon: Wifi, text: "Safe browsing" },
  { icon: CheckCircle, text: "Data encryption" },
]

export default function SecurityPage() {
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [threatCount, setThreatCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsEmailValid(e.target.validity.valid)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

<main className="container mx-auto px-4 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <span className="inline-block animate-gradient bg-gradient-to-r from-blue-400 via-green-500 to-purple-600 bg-[200%_auto] bg-clip-text text-transparent">
              Total Security
            </span>
            <br />
            for Your Digital Life
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Protect your devices with our advanced security solution. Stay safe from viruses, malware, and online threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={handleEmailChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button 
              className="animate-shimmer bg-[linear-gradient(110deg,#00f260,45%,#0575e6,55%,#00f260)] bg-[length:200%_100%] transition-colors hover:bg-[length:100%_100%] text-white border-0"
              disabled={!isEmailValid}
            >
              Try it Free
            </Button>
          </div>
        </motion.div>

        {/* Live threat counter */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Threats Blocked Today</h2>
          <div className="text-5xl font-bold text-green-500">{threatCount.toLocaleString()}</div>
        </motion.div>

        {/* Features grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center space-x-4 rounded-lg bg-white/5 p-6 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <feature.icon className="h-8 w-8 text-green-500" />
              <span className="text-lg font-semibold">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Why choose us section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Our Security Solution?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Advanced Protection", description: "Our security solution uses cutting-edge technology to protect your devices from the latest threats." },
              { title: "Easy to Use", description: "With a user-friendly interface, you can manage your security settings with ease." },
              { title: "Regular Updates", description: "We provide frequent updates to ensure you're always protected against the newest threats." },
              { title: "24/7 Support", description: "Our dedicated support team is always ready to assist you with any security concerns." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + 0.1 * index }}
                className="rounded-lg bg-white/5 p-6 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="mb-4 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

