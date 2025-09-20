"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  User,
  FileText,
  History,
  LogOut,
  Menu,
  X,
  Shield,
  Folder,
  BarChart3, 
  Users 
} from "lucide-react"
import { PatientProfile } from "./patient-profile"
import { ActivePrescriptions } from "./active-prescriptions"
import { PastPrescriptions } from "./past-prescriptions"
import { ConsentDashboard } from "./consent-dashboard"
import { UploadDocuments } from "./UploadDocuments"
import { ReportSummarization } from "./ReportSummarization"
import { GroupsSection } from "./groups-section"

export interface Patient {
  _id: string
  fullName: string
  abhaId: string
  gender: string
  age: number
  bloodGroup: string
  medical: {
    allergies: string[]
    chronicConditions: string[]
  }
  contact: {
    phone: string
    email: string
    address: {
      line1: string
      city: string
      state: string
      postalCode: string
      country: string
    }
  }
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  createdAt: string
  updatedAt: string
  __v: number
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Patient Portal
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Digital Health Records
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop User Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {patient.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
                ABHA: {patient.abhaId}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-card">
            <div className="p-4 space-y-2">
              <div className="text-center pb-4 border-b">
                <p className="text-sm font-medium text-foreground">
                  {patient.fullName}
                </p>
                <p className="text-xs text-muted-foreground">
                  ABHA: {patient.abhaId}
                </p>
              </div>
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button
                  variant={activeTab === "active" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("active")}
                >
                  <FileText className="mr-2 h-4 w-4" /> Active Prescriptions
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("history")}
                >
                  <History className="mr-2 h-4 w-4" /> Past Prescriptions
                </Button>
                <Button
                  variant={activeTab === "consent" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("consent")}
                >
                  <Shield className="mr-2 h-4 w-4" /> Consent Manager
                </Button>
                <Button
                  variant={activeTab === "documents" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("documents")}
                >
                  <Folder className="mr-2 h-4 w-4" /> My Documents
                </Button>
                <Button
                  variant={activeTab === "summarization" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("summarization")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" /> Report Summarization
                </Button>
                <Button
                  variant={activeTab === "groups" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("groups")}
                >
                  <Users className="mr-2 h-4 w-4" /> Groups
                </Button>
              </nav>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 bg-sidebar border-r min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button
              variant={activeTab === "active" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("active")}
            >
              <FileText className="mr-2 h-4 w-4" /> Active Prescriptions
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-4 w-4" /> Past Prescriptions
            </Button>
            <Button
              variant={activeTab === "consent" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("consent")}
            >
              <Shield className="mr-2 h-4 w-4" /> Consent Manager
            </Button>
            <Button
              variant={activeTab === "documents" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("documents")}
            >
              <Folder className="mr-2 h-4 w-4" /> My Documents
            </Button>
            <Button
              variant={activeTab === "summarization" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("summarization")}
            >
              <Folder className="mr-2 h-4 w-4" /> ReportSummarization
            </Button>
            {/* <Button
                variant={activeTab === "groups" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("groups")}
              >
              <Users className="mr-2 h-4 w-4" /> Groups
            </Button> */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-full overflow-hidden">
          {activeTab === "profile" && <PatientProfile patient={patient} />}
          
          {activeTab === "active" && <ActivePrescriptions patient={patient} />}
          {activeTab === "history" && <PastPrescriptions patient={patient} />}
          {activeTab === "consent" && <ConsentDashboard />}
          {activeTab === "documents" && <UploadDocuments />}
          {activeTab === "summarization" && <ReportSummarization />}
          {activeTab === "groups" && <GroupsSection />}
        </main>
      </div>
    </div>
  )
}

export default PatientDashboardLayout
export { PatientDashboardLayout }
