import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { LockIcon, ScanBarcodeIcon, PuzzleIcon, TargetIcon } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-lg bg-zinc-800 px-3 py-1 text-sm">
                    Simple & Powerful
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Finance & Budgeting Made Simple
                  </h1>
                  <p className="max-w-[600px] text-zinc-200 md:text-xl">
                    Powerful analytics and financial management tools to help you make better business decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="default" className="border-white text-white hover:bg-zinc-800">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[600px] aspect-video">
                <Image
                    src="https://kzmkxyrvsmr7twti037d.lite.vusercontent.net/placeholder.svg"
                    alt="Dashboard Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HawkAI Solutions Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-bold text-center text-[#ffffff] mb-12">HawkAI Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* HawkAI Security */}
              <Card className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-[#FFFFFF]">
                      <LockIcon className="w-8 h-8 text-zinc-800" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#FFFFFF]">HawkAI Security</h3>
                  <p className="text-zinc-300 mb-6">
                    Delivers on the promise of SIEM without all the complexity, alert fatigue, and high costs.
                  </p>
                  <Link href="#" className="block text-center text-[#FFFFFF] hover:underline">
                    LEARN MORE
                  </Link>
                </CardContent>
              </Card>

              {/* HawkAI Enterprise */}
              <Card className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-[#FFFFFF]">
                      <ScanBarcodeIcon className="w-8 h-8 text-zinc-800" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#FFFFFF]">HawkAI Enterprise</h3>
                  <p className="text-zinc-300 mb-6">
                    Centralized log management for IT Operations and DevOps teams, built on the HawkAI platform.
                  </p>
                  <Link href="#" className="block text-center text-[#FFFFFF] hover:underline">
                    LEARN MORE
                  </Link>
                </CardContent>
              </Card>

              {/* HawkAI API Security */}
              <Card className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-[#FFFFFF]">
                      <PuzzleIcon className="w-8 h-8 text-zinc-800" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#FFFFFF]">HawkAI API Security</h3>
                  <p className="text-zinc-300 mb-6">
                    The ultimate solution for end-to-end API threat monitoring, detection, and response.
                  </p>
                  <Link href="#" className="block text-center text-[#FFFFFF] hover:underline">
                    LEARN MORE
                  </Link>
                </CardContent>
              </Card>

              {/* HawkAI Open */}
              <Card className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-[#FFFFFF]">
                      <TargetIcon className="w-8 h-8 text-zinc-800" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#FFFFFF]">HawkAI Open</h3>
                  <p className="text-zinc-300 mb-6">
                    Built to open-source standards, a self-managed, SSPL-licensed centralized log management solution.
                  </p>
                  <Link href="#" className="block text-center text-[#FFFFFF] hover:underline">
                    LEARN MORE
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

