"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "../components/doctor-dashboard-layout"

interface Doctor {
  _id: string
  nmcId: string
  fullName: string
  specialty: string
  organization: string
  contact: {
    email: string
    phone: string
    address: {
      line1: string
      city: string
      state: string
      postalCode: string
      country: string
    }
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export default function DoctorDashboardPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL // ✅ same env as patient
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token")
    const savedToken = localStorage.getItem("authToken")

    console.log("🔎 tokenFromUrl:", tokenFromUrl)
    console.log("🔎 savedToken:", savedToken)

    // ✅ CASE 1: Token comes from MagicLink in URL
    if (tokenFromUrl) {
      fetch(`${API_BASE}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenFromUrl }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ verify response:", data)
          if (data.valid && data.payload) {
            localStorage.setItem("authToken", tokenFromUrl)

            return fetch(`${API_BASE}/auth/userDetails`, {
              headers: { Authorization: `Bearer ${tokenFromUrl}` },
            })
          } else {
            throw new Error("Invalid or expired token")
          }
        })
        .then((res) => res?.json())
        .then((user) => {
          console.log("✅ userDetails response:", user)
          setDoctor(user)
          router.replace("/doctor/dashboard") // remove ?token= from URL
        })
        .catch((err) => {
          console.error("❌ error during auth flow:", err)
          router.push("/doctor/login")
        })
        .finally(() => setLoading(false))
    }
    // ✅ CASE 2: No token in URL → use saved token
    else if (savedToken) {
      fetch(`${API_BASE}/auth/userDetails`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired")
          return res.json()
        })
        .then((user) => {
          console.log("✅ userDetails (saved token):", user)
          setDoctor(user)
        })
        .catch((err) => {
          console.error("❌ error with saved token:", err)
          localStorage.removeItem("authToken")
          router.push("/doctor/login")
        })
        .finally(() => setLoading(false))
    }
    // ✅ CASE 3: No token at all → redirect to login
    else {
      setLoading(false)
      router.push("/doctor/login")
    }
  }, [router, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading doctor dashboard...</p>
        </div>
      </div>
    )
  }

  if (!doctor) {
    console.warn("⚠️ doctor is null, not rendering dashboard")
    return null
  }

  console.log("🎯 Final doctor state before render:", doctor)

  return <DashboardLayout doctorData={doctor} />
}
