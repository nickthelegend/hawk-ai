"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, MessageSquare, Phone, Send } from 'lucide-react'
import Image from "next/image"
// import './styles/animations.css'

const teamMembers = [
  { name: "Jenny Rosum", role: "Customer Success Agent", image: "/placeholder.svg?height=400&width=300" },
  { name: "Sophie Chamberlain", role: "Specialized Support", image: "/placeholder.svg?height=400&width=300" },
  { name: "Lana Steiner", role: "VP of Customer Success", image: "/placeholder.svg?height=400&width=300" },
  { name: "Orlando Diggs", role: "Customer Success Lead", image: "/placeholder.svg?height=400&width=300" },
  { name: "Sasha Kindred", role: "Customer Success Lead", image: "/placeholder.svg?height=400&width=300" },
  { name: "Alex Morgan", role: "Technical Support", image: "/placeholder.svg?height=400&width=300" },
  { name: "Chris Parker", role: "Support Engineer", image: "/placeholder.svg?height=400&width=300" },
]

export default function ContactPage() {
  const [currentMember, setCurrentMember] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)
  const mainControls = useAnimation()
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    teamSize: '',
    message: ''
  })

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      teamSize: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formState)
    // Reset form after submission
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      teamSize: '',
      message: ''
    })
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Our team of <span className="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">experts</span> are here to help
          </h1>
          <p className="text-xl text-gray-300">
            Get support 24/7 with our award-winning support network of growth experts.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-200">
              Book a call
            </Button>
            <Button variant="default" className="border-white/10 hover:bg-white/5">
              Book a demo
            </Button>
          </div>
        </motion.div>

        {/* Team Members Carousel Section */}
        <div className="mb-16 relative overflow-hidden">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: "-100%" }}
              transition={{ 
                duration: 100, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-4 min-w-max"
            >
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div key={index} className="w-[300px] flex-shrink-0">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold text-white text-xl mb-1">{member.name}</h3>
                      <p className="text-gray-300 text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>


        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2" ref={containerRef}>
          {/* Contact Form */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-semibold mb-6">Get in touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">First name</label>
                    <Input 
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      className="bg-black/40 border-white/10 focus:border-white/20 transition-colors" 
                      placeholder="First name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Last name</label>
                    <Input 
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      className="bg-black/40 border-white/10 focus:border-white/20 transition-colors" 
                      placeholder="Last name" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Work email</label>
                  <Input 
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="bg-black/40 border-white/10 focus:border-white/20 transition-colors" 
                    type="email" 
                    placeholder="you@company.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Phone number</label>
                  <Input 
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="bg-black/40 border-white/10 focus:border-white/20 transition-colors" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Team size</label>
                  <Select onValueChange={handleSelectChange} value={formState.teamSize}>
                    <SelectTrigger className="bg-black/40 border-white/10 focus:border-white/20 transition-colors">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 people</SelectItem>
                      <SelectItem value="11-50">11-50 people</SelectItem>
                      <SelectItem value="51-200">51-200 people</SelectItem>
                      <SelectItem value="201-500">201-500 people</SelectItem>
                      <SelectItem value="501+">501+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Message</label>
                  <Textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="bg-black/40 border-white/10 focus:border-white/20 transition-colors min-h-[120px]" 
                    placeholder="Tell us about your needs..." 
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white" size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  Send message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Support Information */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/50">Chat to sales</Badge>
                <h3 className="text-2xl font-semibold">Interested in our solution?</h3>
                <p className="text-gray-300">Speak to our friendly team to learn more about how we can help.</p>
                <Button variant="default" className="border-blue-500/50 hover:bg-blue-500/20 text-blue-300" size="lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start a conversation
                </Button>
              </div>

              <div className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105">
                <Badge variant="outline" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/50">Email support</Badge>
                <h3 className="text-2xl font-semibold">Need technical help?</h3>
                <p className="text-gray-300">Our support team is available 24/7 to assist you with any issues.</p>
                <Button variant="default" className="border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-300" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  support@company.com
                </Button>
              </div>

              <div className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105">
                <Badge variant="outline" className="bg-pink-500/20 text-pink-300 border-pink-500/50">Phone</Badge>
                <h3 className="text-2xl font-semibold">Prefer to talk?</h3>
                <p className="text-gray-300">Give us a call Mon-Fri from 8am to 5pm.</p>
                <Button variant="default" className="border-pink-500/50 hover:bg-pink-500/20 text-pink-300" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  +1 (555) 000-0000
                </Button>
              </div>

              <div className="backdrop-blur-lg bg-white/5 p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105">
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/50">Office</Badge>
                <h3 className="text-2xl font-semibold">Visit our office</h3>
                <p className="text-gray-300">Come say hello at our office HQ.</p>
                <Button variant="default" className="border-green-500/50 hover:bg-green-500/20 text-green-300" size="lg">
                  <Building2 className="mr-2 h-5 w-5" />
                  100 Smith Street, Melbourne
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

