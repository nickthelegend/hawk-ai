"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, MessageSquare, Phone } from 'lucide-react'
import Image from "next/image"

const teamMembers = [
  { name: "Jenny Rosum", role: "Customer Success Agent", image: "/placeholder.svg" },
  { name: "Sophie Chamberlain", role: "Specialized Support", image: "/placeholder.svg" },
  { name: "Lana Steiner", role: "VP of Customer Success", image: "/placeholder.svg" },
  { name: "Orlando Diggs", role: "Customer Success Lead", image: "/placeholder.svg" },
  { name: "Sasha Kindred", role: "Customer Success Lead", image: "/placeholder.svg" },
  { name: "Alex Morgan", role: "Technical Support", image: "/placeholder.svg" },
  { name: "Chris Parker", role: "Support Engineer", image: "/placeholder.svg" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="container mx-auto px-4 pt-24">
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Contact <span className="font-serif italic">&</span> support
          </h1>
          <p className="text-lg text-gray-400">
            Have questions about pricing, plans, or our services? Fill out the form
            and our friendly team can get back to you within 24 hours.
          </p>
        </div>

        {/* Team Members Scroll Section */}
        <div className="mb-16">
          <ScrollArea className="w-full whitespace-nowrap rounded-xl">
            <div className="flex w-max space-x-8 p-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group">
                  <div className="relative w-48 h-48 overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-gray-300">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact our sales team</h2>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">First name</label>
                    <Input className="bg-white/5 border-white/10" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Last name</label>
                    <Input className="bg-white/5 border-white/10" placeholder="Last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Work email</label>
                  <Input className="bg-white/5 border-white/10" type="email" placeholder="you@company.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Phone number</label>
                  <Input className="bg-white/5 border-white/10" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Team size</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10">
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
                  <label className="text-sm text-gray-400">Message</label>
                  <Textarea 
                    className="bg-white/5 border-white/10 min-h-[120px]" 
                    placeholder="Tell us about your needs..." 
                  />
                </div>

                <Button className="w-full bg-white text-black hover:bg-gray-200" size="lg">
                  Send message
                </Button>
              </form>
            </div>
          </div>

          {/* Support Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="bg-white/5">Chat to sales</Badge>
                <h3 className="text-xl font-semibold">Interested in our solution?</h3>
                <p className="text-gray-400">Speak to our friendly team.</p>
                <Button variant="outline" className="border-white/10" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start a conversation
                </Button>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="bg-white/5">Email support</Badge>
                <h3 className="text-xl font-semibold">Need help?</h3>
                <p className="text-gray-400">Email us and we'll get back to you within 24 hours.</p>
                <Button variant="outline" className="border-white/10" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  support@company.com
                </Button>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="bg-white/5">Phone</Badge>
                <h3 className="text-xl font-semibold">Call us</h3>
                <p className="text-gray-400">Mon-Fri from 8am to 5pm.</p>
                <Button variant="outline" className="border-white/10" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  +1 (555) 000-0000
                </Button>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" className="bg-white/5">Office</Badge>
                <h3 className="text-xl font-semibold">Visit our office</h3>
                <p className="text-gray-400">Come say hello at our office HQ.</p>
                <Button variant="outline" className="border-white/10" size="lg">
                  <Building2 className="mr-2 h-4 w-4" />
                  100 Smith Street, Melbourne
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

