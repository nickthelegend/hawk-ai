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

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find the right plan that suits your needs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Our wide range of plans ensures that you find the perfect match, giving you the confidence and support you need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="relative overflow-hidden bg-zinc-900 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Starter</h3>
                    <p className="text-sm text-gray-400">For small teams billed monthly.</p>
                    <div className="text-4xl font-bold">$25</div>
                    <p className="text-sm text-gray-400">per month</p>
                    <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">
                      Get Started
                    </Button>
                    <ul className="grid gap-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Financial Workflows
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Analytics & Reporting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        24/7 Customer Support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Secure Transactions
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden bg-zinc-800 text-white">
                <CardContent className="p-6">
                  <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-bold text-black">
                    Popular
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Enterprise</h3>
                    <p className="text-sm text-gray-400">For growing startups billed monthly.</p>
                    <div className="text-4xl font-bold">$60</div>
                    <p className="text-sm text-gray-400">per month</p>
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
                        Advanced Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Priority Support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        API Access
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden bg-zinc-900 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Business</h3>
                    <p className="text-sm text-gray-400">For large companies billed monthly.</p>
                    <div className="text-4xl font-bold">$90</div>
                    <p className="text-sm text-gray-400">per month</p>
                    <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">
                      Get Started
                    </Button>
                    <ul className="grid gap-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Everything in Enterprise
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Custom Integrations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Dedicated Support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Unlimited Access
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <h2 className="text-2xl font-bold mb-8">Compare our plans</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Features</TableHead>
                    <TableHead className="text-white">Starter</TableHead>
                    <TableHead className="text-white">Enterprise</TableHead>
                    <TableHead className="text-white">Business</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-white">Users</TableCell>
                    <TableCell className="text-gray-400">4</TableCell>
                    <TableCell className="text-gray-400">10</TableCell>
                    <TableCell className="text-gray-400">Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-white">Transaction Volume Limit</TableCell>
                    <TableCell className="text-gray-400">$10,000 / month</TableCell>
                    <TableCell className="text-gray-400">$100,000 / month</TableCell>
                    <TableCell className="text-gray-400">Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-white">Bank Integrations</TableCell>
                    <TableCell className="text-gray-400">2 bank integrations</TableCell>
                    <TableCell className="text-gray-400">5 bank integrations</TableCell>
                    <TableCell className="text-gray-400">Custom integrations</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-white">Analytics</TableCell>
                    <TableCell className="text-gray-400">Limited</TableCell>
                    <TableCell className="text-gray-400">Full access</TableCell>
                    <TableCell className="text-gray-400">Full access</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-white">API Access</TableCell>
                    <TableCell className="text-gray-400">No</TableCell>
                    <TableCell className="text-gray-400">Yes</TableCell>
                    <TableCell className="text-gray-400">Full access</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer custom payment terms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a 14-day free trial for all our plans. No credit card required.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
                  <AccordionContent>
                    We offer 24/7 customer support via email for all plans. Enterprise and Business plans also get priority chat support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
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

