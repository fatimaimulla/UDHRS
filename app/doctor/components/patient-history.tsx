"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Calendar, User, FileText, Clock, Pill } from "lucide-react"

interface Medicine {
  name: string
  strength: string
  frequency: string
  days: number
}

interface PrescriptionRecord {
  id: string
  patientId: string
  patientName: string
  date: string
  doctorName: string
  medicines: Medicine[]
  notes?: string
  status: "active" | "completed"
}

// Dummy prescription history data
const dummyPrescriptions: PrescriptionRecord[] = [
  {
    id: "RX001",
    patientId: "P001",
    patientName: "John Smith",
    date: "2024-01-15",
    doctorName: "Dr. Sarah Johnson",
    medicines: [
      { name: "Paracetamol", strength: "500mg", frequency: "BD", days: 5 },
      { name: "Ibuprofen", strength: "400mg", frequency: "TDS", days: 3 },
    ],
    notes: "Take with food. Complete the full course.",
    status: "completed",
  },
  {
    id: "RX002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    date: "2024-01-10",
    doctorName: "Dr. Sarah Johnson",
    medicines: [
      { name: "Metformin", strength: "500mg", frequency: "BD", days: 30 },
      { name: "Glimepiride", strength: "2mg", frequency: "OD", days: 30 },
    ],
    notes: "Monitor blood sugar levels regularly.",
    status: "active",
  },
  {
    id: "RX003",
    patientId: "P001",
    patientName: "John Smith",
    date: "2024-01-05",
    doctorName: "Dr. Michael Brown",
    medicines: [{ name: "Lisinopril", strength: "10mg", frequency: "OD", days: 30 }],
    notes: "Monitor blood pressure weekly.",
    status: "active",
  },
  {
    id: "RX004",
    patientId: "P003",
    patientName: "Michael Brown",
    date: "2023-12-20",
    doctorName: "Dr. Sarah Johnson",
    medicines: [
      { name: "Salbutamol Inhaler", strength: "100mcg", frequency: "As needed", days: 30 },
      { name: "Prednisolone", strength: "5mg", frequency: "OD", days: 7 },
    ],
    notes: "Use inhaler as needed for breathing difficulties.",
    status: "completed",
  },
  {
    id: "RX005",
    patientId: "P004",
    patientName: "Emily Davis",
    date: "2024-01-12",
    doctorName: "Dr. Sarah Johnson",
    medicines: [
      { name: "Diclofenac", strength: "50mg", frequency: "BD", days: 10 },
      { name: "Omeprazole", strength: "20mg", frequency: "OD", days: 10 },
    ],
    notes: "Take diclofenac with food to avoid stomach upset.",
    status: "active",
  },
]

export function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<PrescriptionRecord[]>(dummyPrescriptions)
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionRecord | null>(null)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredPrescriptions(dummyPrescriptions)
      return
    }

    const filtered = dummyPrescriptions.filter(
      (prescription) =>
        prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredPrescriptions(filtered)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setFilteredPrescriptions(dummyPrescriptions)
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Patient History
          </CardTitle>
          <CardDescription>Search by Patient ID, Patient Name, or Prescription ID</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="history-search">Patient ID, Name, or Prescription ID</Label>
              <Input
                id="history-search"
                type="text"
                placeholder="Enter Patient ID (e.g., P001), Name, or Prescription ID (e.g., RX001)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={handleSearch}>Search</Button>
              {searchTerm && (
                <Button variant="outline" onClick={clearSearch}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription History ({filteredPrescriptions.length} records)</CardTitle>
          <CardDescription>
            {searchTerm ? `Showing results for "${searchTerm}"` : "Showing all prescription records"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPrescriptions.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prescription ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Medicines</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prescription.patientName}</p>
                          <p className="text-sm text-muted-foreground">ID: {prescription.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(prescription.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{prescription.doctorName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Pill className="h-3 w-3 text-muted-foreground" />
                          {prescription.medicines.length} medicine{prescription.medicines.length !== 1 ? "s" : ""}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                          {prescription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPrescription(prescription)}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Prescription Details - {prescription.id}
                              </DialogTitle>
                              <DialogDescription>
                                Complete prescription information and medicine details
                              </DialogDescription>
                            </DialogHeader>

                            {selectedPrescription && (
                              <div className="space-y-6">
                                {/* Patient & Prescription Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-base flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Patient Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <p>
                                        <span className="font-medium">Name:</span> {selectedPrescription.patientName}
                                      </p>
                                      <p>
                                        <span className="font-medium">ID:</span> {selectedPrescription.patientId}
                                      </p>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-base flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Prescription Info
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <p>
                                        <span className="font-medium">Date:</span>{" "}
                                        {new Date(selectedPrescription.date).toLocaleDateString()}
                                      </p>
                                      <p>
                                        <span className="font-medium">Doctor:</span> {selectedPrescription.doctorName}
                                      </p>
                                      <p>
                                        <span className="font-medium">Status:</span>
                                        <Badge
                                          variant={selectedPrescription.status === "active" ? "default" : "secondary"}
                                          className="ml-2"
                                        >
                                          {selectedPrescription.status}
                                        </Badge>
                                      </p>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Medicines */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <Pill className="h-4 w-4" />
                                      Prescribed Medicines
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {selectedPrescription.medicines.map((medicine, index) => (
                                        <div key={index} className="p-3 border rounded-lg">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline">{index + 1}</Badge>
                                            <h4 className="font-semibold">{medicine.name}</h4>
                                          </div>
                                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                                            <p>
                                              <span className="font-medium">Strength:</span> {medicine.strength}
                                            </p>
                                            <p>
                                              <span className="font-medium">Frequency:</span> {medicine.frequency}
                                            </p>
                                            <p>
                                              <span className="font-medium">Duration:</span> {medicine.days} days
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Notes */}
                                {selectedPrescription.notes && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-base">Additional Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-sm bg-muted p-3 rounded-lg">{selectedPrescription.notes}</p>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex flex-col items-center space-y-2">
                <Search className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No prescription records found</p>
                {searchTerm && <p className="text-sm text-muted-foreground">Try searching with a different term</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
