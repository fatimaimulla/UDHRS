"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PatientRegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Registration</h1>
        
        <form className="space-y-6">
            <div>
                <Label htmlFor="name" className="mb-4">Full Name</Label>
                <Input id="name" type="text" placeholder="Jane Doe" required />
            </div>
            <div>
                <Label htmlFor="abha" className="mb-4">ABHA Number</Label>
                <Input id="abha" type="text" placeholder="14-digit ABHA number" required />
            </div>
            <div>
                <Label htmlFor="mobile" className="mb-4">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="+91 9876543210" required />
            </div>
            <div>
                <Label htmlFor="email" className="mb-4">Email</Label>
                <Input id="email" type="email" placeholder="patient@example.com" required />
            </div>
            <div>
                <Label htmlFor="gender" className="mb-4">Gender</Label>
                <select
                id="gender"
                className="w-full rounded-md border p-2"
                required
                >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
                </select>
            </div>
            <div>
                <Label htmlFor="dob" className="mb-4">Date of Birth</Label>
                <Input id="dob" type="date" required />
            </div>

            <Button type="submit" className="w-full">Register</Button>
        </form>


        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/patient/login" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
