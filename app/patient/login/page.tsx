"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PatientLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Login</h1>
        
        <form className="space-y-6">
          <div>
            <Label htmlFor="abha" className="mb-4">ABHA Number</Label>
            <Input id="abha" type="text" placeholder="Enter ABHA Number" required />
          </div>

          <Button type="submit" className="w-full">Send OTP</Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/patient/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Don’t have an ABHA number?{" "}
          <a
            href="https://abha.abdm.gov.in/abha/v3/register"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Create here
          </a>
        </p>
      </div>
    </div>
  )
}
