import { Suspense } from "react"
import { BillingContent } from "@/components/billing-content"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function BillingPage() {
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
            <div 
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Complete Your Purchase
              </h1>
            </div>

            <Suspense fallback={<BillingLoadingSkeleton />}>
              <BillingContent />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  )
}

function BillingLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gradient-to-b from-[#131313] to-black">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 bg-gray-700" />
            <div className="mt-6 space-y-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <Skeleton className="h-6 w-36 bg-gray-700 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 bg-gray-700" />
                      <Skeleton className="h-5 flex-1 bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20 bg-gray-700" />
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gradient-to-b from-[#131313] to-black">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 bg-gray-700 mb-6" />
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
              <Skeleton className="h-12 w-full bg-gray-700" />
              <Skeleton className="h-4 w-64 mx-auto bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
