"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, ShieldCheck, Clock, Mail, AlertTriangle } from 'lucide-react'

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => {
      const stars = document.querySelector('.stars') as HTMLElement
      if (stars) {
        stars.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars absolute inset-0 transition-all duration-5000 ease-in-out" style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffffff03 0.5px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <main className="container relative mx-auto px-4 pt-6">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Complete Your Purchase
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-lg">
                You've selected the {selectedPlan} plan
              </p>
            </motion.div>

            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column - Order Summary */}
                <Card className="border-gray-800 bg-gradient-to-b from-[#131313] to-black">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-[#1a1a1a] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-4">Security Features</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-gray-300">
                            <ShieldCheck className="h-5 w-5 text-green-400 mt-1" />
                            <span>AI-powered Windows log analysis with real-time monitoring</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-300">
                            <Clock className="h-5 w-5 text-green-400 mt-1" />
                            <span>Track user login/logout sessions with timestamp analysis</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-300">
                            <Mail className="h-5 w-5 text-green-400 mt-1" />
                            <span>Automated email reports with security insights</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-300">
                            <AlertTriangle className="h-5 w-5 text-green-400 mt-1" />
                            <span>Instant security warnings and threat detection</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-400">
                          <span>Subtotal</span>
                          <span>$29.99</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Tax</span>
                          <span>$2.99</span>
                        </div>
                        <Separator className="bg-gray-800" />
                        <div className="flex justify-between text-white font-semibold">
                          <span>Total</span>
                          <span>$32.98</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Column - Payment Details */}
                <Card className="border-gray-800 bg-gradient-to-b from-[#131313] to-black">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                    
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="you@example.com" 
                            className="bg-[#1a1a1a] border-gray-700 text-white" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card" className="text-white">Card Information</Label>
                          <Input 
                            id="card" 
                            placeholder="1234 5678 9012 3456" 
                            className="bg-[#1a1a1a] border-gray-700 text-white" 
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input 
                              placeholder="MM/YY" 
                              className="bg-[#1a1a1a] border-gray-700 text-white" 
                            />
                            <Input 
                              placeholder="CVC" 
                              className="bg-[#1a1a1a] border-gray-700 text-white" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">Cardholder Name</Label>
                          <Input 
                            id="name" 
                            placeholder="Full name on card" 
                            className="bg-[#1a1a1a] border-gray-700 text-white" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-white">Billing Address</Label>
                          <Input 
                            id="address" 
                            placeholder="Street address" 
                            className="bg-[#1a1a1a] border-gray-700 text-white" 
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <Input 
                              placeholder="City" 
                              className="bg-[#1a1a1a] border-gray-700 text-white" 
                            />
                            <Input 
                              placeholder="State" 
                              className="bg-[#1a1a1a] border-gray-700 text-white" 
                            />
                            <Input 
                              placeholder="ZIP" 
                              className="bg-[#1a1a1a] border-gray-700 text-white" 
                            />
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-b from-white to-gray-200 text-black hover:opacity-90">
                        Complete Purchase
                      </Button>

                      <p className="text-center text-sm text-gray-400">
                        Your payment is secured and encrypted
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

