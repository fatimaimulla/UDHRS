"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientProfile } from "./patient-profile"
import { ActivePrescriptions } from "./active-prescriptions"
import { PastPrescriptions } from "./past-prescriptions"
import { PatientAppointments } from "./patient-appointments"
import { User, FileText, History, Calendar, LogOut, Menu, X } from "lucide-react"

interface Patient {
  abhaId: string
  name: string
  age: number
  gender: string
}

interface PatientDashboardLayoutProps {
  patient: Patient
}

const PatientDashboardLayout = ({ patient }: PatientDashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("currentPatient")
    router.push("/")
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "active", label: "Active Prescriptions", icon: FileText },
    { id: "history", label: "Past Prescriptions", icon: History },
    { id: "appointments", label: "Appointments", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Patient Portal</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Digital Health Records</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{patient.name}</p>
                <p className="text-xs text-muted-foreground">ABHA: {patient.abhaId}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-2">
              <div className="text-center pb-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">{patient.name}</p>
                <p className="text-xs text-muted-foreground">ABHA: {patient.abhaId}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, {patient.name.split(" ")[0]}!</h2>
          <p className="text-muted-foreground">Access and manage your health records</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <PatientProfile patient={patient} />
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <ActivePrescriptions patient={patient} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <PastPrescriptions patient={patient} />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <PatientAppointments patient={patient} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default PatientDashboardLayout
export { PatientDashboardLayout }
