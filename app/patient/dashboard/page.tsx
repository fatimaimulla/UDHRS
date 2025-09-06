"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PatientDashboardLayout } from "../components/patient-dashboard-layout"

interface Patient {
  abhaId: string
  name: string
  age: number
  gender: string
}

export default function PatientDashboard() {
  const [patient, setPatient] = useState<Patient | null>(null)
  const router = useRouter()

  useEffect(() => {
    const patientData = localStorage.getItem("currentPatient")
    if (patientData) {
      setPatient(JSON.parse(patientData))
    } else {
      router.push("/")
    }
  }, [router])

  if (!patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return <PatientDashboardLayout patient={patient} />
}
