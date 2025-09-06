"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "../components/dashboard-layout"

interface DoctorData {
  nmcId: string
  name: string
  specialization: string
  hospital: string
}

export default function DashboardPage() {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("doctorData")
    if (!stored) {
      router.push("/")
      return
    }
    setDoctorData(JSON.parse(stored))
  }, [router])

  if (!doctorData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return <DashboardLayout doctorData={doctorData} />
}
