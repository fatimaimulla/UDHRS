"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DoctorRegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Doctor Registration</h1>

        <form className="space-y-6">
          <div>
            <Label htmlFor="nmcId" className="mb-4">NMC ID</Label>
            <Input id="nmcId" type="text" placeholder="Enter your NMC ID" required />
          </div>
          <div>
            <Label htmlFor="abha" className="mb-4">ABHA Number (Optional)</Label>
            <Input id="abha" type="text" placeholder="14-digit ABHA number" />
          </div>
          <div>
            <Label htmlFor="mobile" className="mb-4">Mobile Number</Label>
            <Input id="mobile" type="tel" placeholder="+91 9876543210" required />
          </div>
          <div>
            <Label htmlFor="email" className="mb-4">Email</Label>
            <Input id="email" type="email" placeholder="doctor@example.com" />
          </div>
          <div>
            <Label htmlFor="specialization" className="mb-4">Specialization</Label>
            <Input id="specialization" type="text" placeholder="e.g., Cardiology, Pediatrics" />
          </div>
          <div>
            <Label htmlFor="clinic" className="mb-4">Clinic / Hospital</Label>
            <Input id="clinic" type="text" placeholder="ABC Hospital, Mumbai" />
          </div>

          <Button type="submit" className="w-full">Register</Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/doctor/login" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
