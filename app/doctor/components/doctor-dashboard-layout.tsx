"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  FileText,
  History,
  LogOut,
  Stethoscope,
  Users,
  Calendar,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PatientSearch } from "./patient-search";
import { PrescriptionForm } from "./prescription-form";
import { PatientHistory } from "./patient-history";

interface DoctorData {
  nmcId: string;
  name: string;
  specialization: string;
  hospital: string;
}

interface DashboardLayoutProps {
  doctorData: DoctorData;
}

const DashboardLayout = ({ doctorData }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctorData");
    router.push("/");
  };

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleNavigateToPrescription = () => {
    setActiveTab("prescription");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToHistory = () => {
    setActiveTab("history");
    setIsMobileMenuOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                HealthRecord Pro
              </span>
              <span className="text-lg font-bold text-foreground sm:hidden">
                HRP
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {doctorData.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {doctorData.specialization}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-card">
            <div className="p-4 space-y-4">
              <div className="text-center pb-4 border-b">
                <p className="text-sm font-medium text-foreground">
                  {doctorData.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {doctorData.specialization}
                </p>
              </div>
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange("overview")}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "find-patient" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange("find-patient")}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Find Patient
                </Button>
                <Button
                  variant={activeTab === "prescription" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange("prescription")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Prescription
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange("history")}
                >
                  <History className="mr-2 h-4 w-4" />
                  Patient History
                </Button>
              </nav>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-sidebar border-r min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "find-patient" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("find-patient")}
            >
              <Search className="mr-2 h-4 w-4" />
              Find Patient
            </Button>
            <Button
              variant={activeTab === "prescription" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("prescription")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Prescription
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-4 w-4" />
              Patient History
            </Button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 max-w-full overflow-hidden">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                  Welcome back, {doctorData.name}
                </h1>
                <p className="text-muted-foreground">
                  Here's your dashboard overview
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Patients
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">247</div>
                    <p className="text-xs text-muted-foreground">
                      +12 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Today's Appointments
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      2 completed, 6 pending
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow md:col-span-2 xl:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Prescriptions Today
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">
                      +3 from yesterday
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                      onClick={() => setActiveTab("find-patient")}
                    >
                      <Search className="h-6 w-6" />
                      <span>Find Patient</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                      onClick={() => setActiveTab("prescription")}
                    >
                      <FileText className="h-6 w-6" />
                      <span>New Prescription</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1 bg-transparent"
                      onClick={() => setActiveTab("history")}
                    >
                      <History className="h-6 w-6" />
                      <span>View History</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "find-patient" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Find Patient
                </h1>
                <p className="text-muted-foreground">
                  Search for patients by ID or name
                </p>
              </div>
              <PatientSearch
                onSelectPatient={handlePatientSelect}
                onNavigateToPrescription={handleNavigateToPrescription}
                onNavigateToHistory={handleNavigateToHistory}
              />
            </div>
          )}

          {activeTab === "prescription" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Create Prescription
                </h1>
                <p className="text-muted-foreground">
                  Create new prescriptions with manual entry or voice input
                </p>
              </div>
              <PrescriptionForm
                selectedPatient={selectedPatient}
                onGoToFindPatient={() => setActiveTab("find-patient")}
              />
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Patient History
                </h1>
                <p className="text-muted-foreground">
                  View previous prescriptions and patient records
                </p>
              </div>
              <PatientHistory />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
export { DashboardLayout };
