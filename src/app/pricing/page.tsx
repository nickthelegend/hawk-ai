"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Toggle } from "@/components/ui/toggle"
import { useState } from "react"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 transform">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent blur-3xl" />
        </div>
        {/* Stars */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffffff03 0.5px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <main className="relative">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-sm font-medium text--400">Pricing</h2>
                <h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                  Security. Privacy. Freedom.
                </h1>
                <h2 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl xl:text-5xl/none">
                  for Everyone.
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-lg">
                  Select a plan to access your favorite content with lightning speed and unlimited data.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-full border border-gray-800 p-1">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    !isAnnual ? 'bg-purple-600 text-white' : 'text-gray-400'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    isAnnual ? 'bg-purple-600 text-white' : 'text-gray-400'
                  }`}
                >
                  Annually
                </button>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="relative overflow-hidden border-gray-800 bg-black/40 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white">Personal</h3>
                    <p className="text-sm text-gray-400">For individuals and small teams.</p>
                    <div className="text-4xl font-bold text-white">Free</div>
                    <p className="text-sm text-gray-400">forever</p>
                    <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">
                      Get Started
                    </Button>
                    <ul className="grid gap-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Basic Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Up to 5 Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Community Support
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-purple-500/20 bg-black/40 backdrop-blur-xl">
                <div className="absolute right-2 top-2 rounded-full bg-purple-600 px-2 py-1 text-xs font-bold text-white">
                  Best Deal
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white">Starter</h3>
                    <p className="text-sm text-gray-400">Perfect for growing teams.</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">$2.99</span>
                      <span className="text-sm text-gray-400">/month</span>
                    </div>
                    <p className="text-sm">+3 EXTRA months</p>
                    <Button className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">
                      Get Started
                    </Button>
                    <ul className="grid gap-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Everything in Personal
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Advanced Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Priority Support
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-gray-800 bg-black/40 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white">Premium</h3>
                    <p className="text-sm text-gray-400">For large enterprises.</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">$6.99</span>
                      <span className="text-sm text-gray-400">/month</span>
                    </div>
                    <p className="text-sm text-white">+3 EXTRA months</p>
                    <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">
                      Get Started
                    </Button>
                    <ul className="grid gap-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Everything in Starter
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Custom Integrations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Dedicated Support
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <h2 className="mb-8 text-2xl font-bold text-white">Compare our plans</h2>
              <div className="relative overflow-hidden rounded-lg border border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-white">Features</TableHead>
                      <TableHead className="text-white">Personal</TableHead>
                      <TableHead className="text-white">Starter</TableHead>
                      <TableHead className="text-white">Premium</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-gray-800">
                      <TableCell className="text-white">Users</TableCell>
                      <TableCell className="text-gray-400">4</TableCell>
                      <TableCell className="text-gray-400">10</TableCell>
                      <TableCell className="text-gray-400">Unlimited</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-800">
                      <TableCell className="text-white">Storage</TableCell>
                      <TableCell className="text-gray-400">10 GB</TableCell>
                      <TableCell className="text-gray-400">100 GB</TableCell>
                      <TableCell className="text-gray-400">Unlimited</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-800">
                      <TableCell className="text-white">API Access</TableCell>
                      <TableCell className="text-gray-400">Basic</TableCell>
                      <TableCell className="text-gray-400">Advanced</TableCell>
                      <TableCell className="text-gray-400">Full access</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mx-auto max-w-3xl py-12">
              <h2 className="mb-8 text-center text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-800">
                  <AccordionTrigger className="text-white hover:text-purple-400">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    We accept all major credit cards, PayPal, and bank transfers. For enterprise
                    customers, we also offer custom payment terms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-gray-800">
                  <AccordionTrigger className="text-white hover:text-purple-400">
                    Can I change my plan later?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be
                    reflected in your next billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-gray-800">
                  <AccordionTrigger className="text-white hover:text-purple-400">
                    Is there a free trial available?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Yes, we offer a 14-day free trial for all our plans. No credit card required.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

