"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"
import { login } from "@/lib/api/auth"
export function LoginForm() {
  const [nmcId, setNmcId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nmcId.trim()) return
    setIsLoading(true)

    try {
      const message = await login(nmcId, "doctor");
     

      
    } catch (err) {
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Stethoscope className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle>Doctor Login</CardTitle>
        <CardDescription>Enter your NMC ID to access the dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nmcId">NMC ID</Label>
            <Input
              id="nmcId"
              type="text"
              placeholder="Enter your NMC ID"
              value={nmcId}
              onChange={(e) => setNmcId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !nmcId.trim()}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
