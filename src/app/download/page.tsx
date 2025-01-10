import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">HawkAI</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Download</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contacts</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Login
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl max-w-5xl">
            <span className="inline-block animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[200%_auto] bg-clip-text text-transparent">
              Scaling your team
            </span>
            <br />
            <span className="text-white">with the best tool</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-400">
            Hiring managers make recruiting and selecting the best candidates
            for job openings. Control your team easier than ever.
          </p>
          
          <Button 
            size="lg" 
            className="animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e40af,55%,#000103)] bg-[length:200%_100%] transition-colors hover:bg-[length:100%_100%] text-lg px-8 py-6 rounded-xl"
          >
            Download now - it's FREE
          </Button>

          <div className="mt-8 flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <div className="flex gap-0.5">
              {Array(5).fill(null).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-600 text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 font-medium">
              Rated 4.5 out of 5 from 545 reviews
            </span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 rounded-2xl bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-sm border border-white/10">
          <div className="rounded-xl overflow-hidden bg-gray-900/50">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Dashboard Preview"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Matching",
              description: "Our advanced AI algorithms match the perfect candidates with your job openings automatically."
            },
            {
              title: "Real-time Analytics",
              description: "Track your hiring pipeline and team performance with detailed real-time analytics."
            },
            {
              title: "Smart Automation",
              description: "Automate repetitive tasks and focus on what matters most - building great teams."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="relative text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="relative text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="mt-32 text-center pb-20">
          <h2 className="mb-12 text-2xl font-semibold text-white">
            Trusted by leading companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {[
              'ebay',
              'tvN',
              'Daum',
              'MBC',
              'Kasa',
              'KBS',
              'Saramin'
            ].map((company) => (
              <div
                key={company}
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent hover:from-white hover:to-gray-300 transition-all duration-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

