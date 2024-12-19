'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { FaTwitter } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Log in to your account</h1>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <FaTwitter className="mr-2 h-4 w-4 text-blue-400" />
            Sign in with X (Twitter)
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email
              </label>
              <Input
                className="mt-2"
                id="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                Password
              </label>
              <Input
                className="mt-2"
                id="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-900" type="submit">
            Log in
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="underline underline-offset-4 hover:text-gray-600" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

