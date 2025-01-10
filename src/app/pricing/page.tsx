"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { CheckIcon, XIcon, HelpCircleIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const plans = [
  {
    name: "Personal",
    description: "For individuals and small teams.",
    price: { monthly: 0, annually: 0 },
    features: [
      "Basic Analytics",
      "Up to 5 Projects",
      "Community Support",
    ],
    popular: false,
    cta: "Get Started",
    ctaStyle: "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white",
  },
  {
    name: "Starter",
    description: "Perfect for growing teams.",
    price: { monthly: 2.99, annually: 29.99 },
    features: [
      "Everything in Personal",
      "Advanced Analytics",
      "Priority Support",
    ],
    popular: true,
    cta: "Get Started",
    ctaStyle: "bg-gradient-to-b from-white to-gray-200 text-black",
  },
  {
    name: "Premium",
    description: "For large enterprises.",
    price: { monthly: 6.99, annually: 69.99 },
    features: [
      "Everything in Starter",
      "Custom Integrations",
      "Dedicated Support",
    ],
    popular: false,
    cta: "Get Started",
    ctaStyle: "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white",
  },
]

const featureComparison = [
  { name: "Users", personal: "4", starter: "10", premium: "Unlimited" },
  { name: "Storage", personal: "10 GB", starter: "100 GB", premium: "Unlimited" },
  { name: "API Access", personal: "Basic", starter: "Advanced", premium: "Full access" },
]

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer custom payment terms."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all our plans. No credit card required."
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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

      <main className="relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-gray-400">Pricing</h2>
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
                    !isAnnual ? 'bg-[#ececec] text-black' : 'bg-[#131313] text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    isAnnual ? 'bg-[#ececec] text-black' : 'bg-[#131313] text-white'
                  }`}
                >
                  Annually
                  <span className="ml-1 text-xs text-green-400">Save 20%</span>
                </button>
              </div>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <AnimatePresence>
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`relative overflow-hidden border-gray-800 bg-gradient-to-b from-[#131313] to-black transition-all duration-300 ${
                        selectedPlan === plan.name ? 'ring-2 ring-white' : ''
                      }`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      {plan.popular && (
                        <div className="absolute right-0 top-0">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 translate-y-4">
                            POPULAR
                          </div>
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                          <p className="text-sm text-gray-400">{plan.description}</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">
                              ${isAnnual ? plan.price.annually : plan.price.monthly}
                            </span>
                            <span className="text-sm text-gray-400">
                              {isAnnual ? '/year' : '/month'}
                            </span>
                          </div>
                          {isAnnual && (
                            <p className="text-sm text-green-400">Save ${(plan.price.monthly * 12 - plan.price.annually).toFixed(2)} annually</p>
                          )}
                          <Button className={`mt-4 w-full h-12 ${plan.ctaStyle} border-0 hover:opacity-90`}>
                            {plan.cta}
                          </Button>
                          <ul className="grid gap-2 text-sm text-gray-400">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckIcon className="h-4 w-4 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mx-auto max-w-5xl py-12"
            >
              <h2 className="mb-8 text-2xl font-bold text-white">Compare our plans</h2>
              <div className="relative overflow-hidden rounded-lg border border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-white">Features</TableHead>
                      {plans.map(plan => (
                        <TableHead key={plan.name} className="text-white">{plan.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureComparison.map((feature, index) => (
                      <TableRow key={index} className="border-gray-800">
                        <TableCell className="text-white">{feature.name}</TableCell>
                        <TableCell className="text-gray-400">{feature.personal}</TableCell>
                        <TableCell className="text-gray-400">{feature.starter}</TableCell>
                        <TableCell className="text-gray-400">{feature.premium}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mx-auto max-w-3xl py-12"
            >
              <h2 className="mb-8 text-center text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                    <AccordionTrigger className="text-white hover:text-[#ececec]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center py-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
              <p className="text-gray-400 mb-6">Our team is here to help. Contact us anytime.</p>
              <Button className="bg-white text-black hover:bg-gray-200">Contact Sales</Button>
            </motion.div>
          </div>
        </section>
      </main>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="fixed bottom-4 right-4 rounded-full p-2 bg-white text-black">
              <HelpCircleIcon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help choosing a plan?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

