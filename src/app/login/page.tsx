"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from 'lucide-react'
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaTwitter } from "react-icons/fa"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your login logic here
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto flex min-h-screen max-w-[1200px]">
        <div className="flex w-full flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex w-full flex-col p-8 lg:w-[480px]">
            <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            
            <div className="mt-20">
              <h1 className="text-2xl font-semibold">Welcome back</h1>
              
              <div className="mt-8 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-black"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-black"
                  onClick={() => signIn('twitter', { callbackUrl: '/dashboard' })}
                >
                  <FaTwitter className="mr-2 h-5 w-5 text-blue-400" />
                  Sign in with X (Twitter)
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-400">OR</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 bg-zinc-900 border-gray-800"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400" htmlFor="password">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 bg-zinc-900 border-gray-800"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-white hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Feature Slider */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <FeatureSlider />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureSlider() {
  const features = [
    {
      title: "Powerful Analytics",
      description: "Get detailed insights into your security posture",
      image: "/placeholder.svg"
    },
    {
      title: "Real-time Monitoring",
      description: "Track vulnerabilities as they emerge",
      image: "/placeholder.svg"
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with your team",
      image: "/placeholder.svg"
    }
  ]

  return (
    <div className="w-full max-w-[600px] p-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        {features.map((feature, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-gray-200">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

