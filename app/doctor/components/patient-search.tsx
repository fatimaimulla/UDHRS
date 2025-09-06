"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, User, Phone, Calendar, MapPin, FileText, History } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  address: string
  lastVisit: string
  condition: string
  status: "active" | "inactive"
}

// Dummy patient data
const dummyPatients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1-555-0123",
    address: "123 Main St, City",
    lastVisit: "2024-01-15",
    condition: "Hypertension",
    status: "active",
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+1-555-0456",
    address: "456 Oak Ave, City",
    lastVisit: "2024-01-10",
    condition: "Diabetes Type 2",
    status: "active",
  },
  {
    id: "P003",
    name: "Michael Brown",
    age: 28,
    gender: "Male",
    phone: "+1-555-0789",
    address: "789 Pine St, City",
    lastVisit: "2023-12-20",
    condition: "Asthma",
    status: "inactive",
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 55,
    gender: "Female",
    phone: "+1-555-0321",
    address: "321 Elm St, City",
    lastVisit: "2024-01-12",
    condition: "Arthritis",
    status: "active",
  },
  {
    id: "P005",
    name: "Robert Wilson",
    age: 38,
    gender: "Male",
    phone: "+1-555-0654",
    address: "654 Maple Ave, City",
    lastVisit: "2024-01-08",
    condition: "Migraine",
    status: "active",
  },
]

interface PatientSearchProps {
  onSelectPatient?: (patient: Patient) => void
  onNavigateToPrescription?: () => void
  onNavigateToHistory?: () => void
}

export function PatientSearch({ onSelectPatient, onNavigateToPrescription, onNavigateToHistory }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter patients by ID or name
    const results = dummyPatients.filter(
      (patient) =>
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setSearchResults(results)
    setIsSearching(false)
  }

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    onSelectPatient?.(patient)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleCreatePrescription = () => {
    if (selectedPatient) {
      onNavigateToPrescription?.()
    }
  }

  const handleViewHistory = () => {
    if (selectedPatient) {
      onNavigateToHistory?.()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Patient Search
          </CardTitle>
          <CardDescription>Search for patients by Patient ID or Name</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Patient ID or Name</Label>
              <Input
                id="search"
                type="text"
                placeholder="Enter Patient ID (e.g., P001) or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()} className="w-full sm:w-auto">
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>Click on a patient to view details and create prescriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((patient) => (
                <Card
                  key={patient.id}
                  className={`cursor-pointer transition-all duration-200 hover:bg-accent/50 hover:shadow-md ${
                    selectedPatient?.id === patient.id ? "ring-2 ring-primary bg-accent/30" : ""
                  }`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-foreground text-balance">{patient.name}</h3>
                            <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                              {patient.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ID: {patient.id} • {patient.age} years • {patient.gender}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{patient.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-left lg:text-right text-sm flex-shrink-0">
                        <p className="font-medium text-foreground">{patient.condition}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Patient Details */}
      {selectedPatient && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="text-accent flex items-center gap-2">
              <User className="h-5 w-5" />
              Selected Patient
            </CardTitle>
            <CardDescription>Patient selected for prescription or history review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Patient Information</Label>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {selectedPatient.name}
                  </p>
                  <p>
                    <span className="font-medium">ID:</span> {selectedPatient.id}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span> {selectedPatient.age} years
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span> {selectedPatient.gender}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Contact & Medical Info</Label>
                <div className="mt-2 space-y-2">
                  <p className="break-words">
                    <span className="font-medium">Phone:</span> {selectedPatient.phone}
                  </p>
                  <p className="break-words">
                    <span className="font-medium">Address:</span> {selectedPatient.address}
                  </p>
                  <p>
                    <span className="font-medium">Condition:</span> {selectedPatient.condition}
                  </p>
                  <p>
                    <span className="font-medium">Last Visit:</span>{" "}
                    {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 flex items-center gap-2" onClick={handleCreatePrescription}>
                <FileText className="h-4 w-4" />
                Create Prescription
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2 bg-transparent"
                onClick={handleViewHistory}
              >
                <History className="h-4 w-4" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchTerm && searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Search className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No patients found matching "{searchTerm}"</p>
              <p className="text-sm text-muted-foreground">Try searching with a different Patient ID or Name</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
