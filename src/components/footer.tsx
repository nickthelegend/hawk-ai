import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              HawkAI
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Subscribe to our newsletter and never miss an update. Stay informed about the latest news, trends, and exclusive offers.
            </p>
            <div className="mt-4 flex gap-2">
              <Input
                className="max-w-xs bg-zinc-900 border-gray-800"
                placeholder="Enter your email"
                type="email"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/documentation">Documentation</Link>
              </li>
              <li>
                <Link href="/api">API Reference</Link>
              </li>
              <li>
                <Link href="/support">Support</Link>
              </li>
              <li>
                <Link href="/status">Status</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} HawkAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

