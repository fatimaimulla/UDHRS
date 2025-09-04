"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DoctorLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Doctor Login</h1>
        
        <form className="space-y-8">
          <div>
            <Label htmlFor="nmc" className="mb-4">NMC ID</Label>
            <Input id="nmc" type="text" placeholder="Enter NMC Id" required />
          </div>

          <Button type="submit" className="w-full">Send OTP</Button>
        </form>

        <p> <Link href="/doctor/dashboard">Portal</Link> </p>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/doctor/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
