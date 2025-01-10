import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function SecurityPage() {
  const features = [
    "Real-time threat detection",
    "Firewall protection",
    "Secure online banking",
    "Anti-ransomware",
    "Safe browsing",
    "Data encryption",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              Total Security
            </span>
            <br />
            for Your Digital Life
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Protect your devices with our advanced security solution. Stay safe from viruses, malware, and online threats.
          </p>
          <Button className="bg-green-500 px-8 py-3 text-lg font-semibold text-white hover:bg-green-600">
            Try it Free for 30 Days
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 rounded-lg bg-gray-800 p-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-lg font-semibold">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Why Choose Our Security Solution?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Advanced Protection</h3>
              <p className="text-gray-300">
                Our security solution uses cutting-edge technology to protect your devices from the latest threats.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Easy to Use</h3>
              <p className="text-gray-300">
                With a user-friendly interface, you can manage your security settings with ease.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Regular Updates</h3>
              <p className="text-gray-300">
                We provide frequent updates to ensure you're always protected against the newest threats.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">24/7 Support</h3>
              <p className="text-gray-300">
                Our dedicated support team is always ready to assist you with any security concerns.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

