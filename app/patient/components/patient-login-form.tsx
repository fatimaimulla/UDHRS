"use client"

import type React from "react"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Shield } from "lucide-react"
import { login } from "@/lib/api/auth"

// Dummy ABHA IDs for testing
const dummyPatients = [
  { abhaId: "12-3456-7890-1234", name: "Rajesh Kumar", age: 45, gender: "Male" },
  { abhaId: "98-7654-3210-9876", name: "Priya Sharma", age: 32, gender: "Female" },
  { abhaId: "11-2233-4455-6677", name: "Amit Patel", age: 28, gender: "Male" },
  { abhaId: "55-6677-8899-0011", name: "Sunita Singh", age: 38, gender: "Female" },
]

export function PatientLoginForm() {
  const [abhaId, setAbhaId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")
  console.log("Submitting ABHA ID:", abhaId)

  try {
    const res= await login(abhaId, "patient");
    
    if (!res.success)
    {
      console.log(res.status)
      throw new Error("Invalid ABHA ID" );
    }
    else
    {
      router.push("/patient/check-email")
   }
  } catch (err: any) {
    setError(err.message || "Login failed. Please try again.")
  } finally {
    setIsLoading(false)
  }
}


  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Patient Login
        </CardTitle>
        <CardDescription className="text-center">
          Enter your ABHA ID to access your health records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="abhaId">ABHA ID</Label>
            <Input
              id="abhaId"
              type="text"
              placeholder="12-3456-7890-1234"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              required
              className="text-center tracking-wider"
            />
          </div>

          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Demo ABHA IDs:</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>12-3456-7890-0001 (Mithrajeeth Yadavar)</div>
            <div>12-3456-7890-0002 (Tufail Ahmed Khan)</div>
            <div>12-3456-7890-0003 (Fatima Mulla)</div>
            <div>12-1234-1234-1234 (Araya Bhagat)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
