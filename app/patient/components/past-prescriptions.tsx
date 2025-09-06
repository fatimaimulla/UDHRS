"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { History, Search, Eye, Download, Calendar, User } from "lucide-react"

interface Patient {
  abhaId: string
  name: string
  age: number
  gender: string
}

interface PastPrescriptionsProps {
  patient: Patient
}

export function PastPrescriptions({ patient }: PastPrescriptionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock past prescriptions data
  const pastPrescriptions = [
    {
      id: "RX-2023-045",
      doctorName: "Dr. Amit Kumar",
      specialization: "General Physician",
      date: "2023-12-10",
      condition: "Common Cold",
      medicines: [
        { name: "Paracetamol", strength: "500mg", frequency: "TDS", duration: "5 days" },
        { name: "Cetirizine", strength: "10mg", frequency: "OD", duration: "7 days" },
      ],
      status: "Completed",
      notes: "Patient recovered well. No complications.",
    },
    {
      id: "RX-2023-032",
      doctorName: "Dr. Sunita Patel",
      specialization: "Dermatologist",
      date: "2023-11-15",
      condition: "Eczema",
      medicines: [
        { name: "Hydrocortisone Cream", strength: "1%", frequency: "BD", duration: "14 days" },
        { name: "Moisturizer", strength: "N/A", frequency: "TDS", duration: "30 days" },
      ],
      status: "Completed",
      notes: "Skin condition improved significantly.",
    },
    {
      id: "RX-2023-018",
      doctorName: "Dr. Rajesh Gupta",
      specialization: "Cardiologist",
      date: "2023-10-20",
      condition: "Hypertension Follow-up",
      medicines: [
        { name: "Amlodipine", strength: "5mg", frequency: "OD", duration: "30 days" },
        { name: "Aspirin", strength: "75mg", frequency: "OD", duration: "30 days" },
      ],
      status: "Completed",
      notes: "Blood pressure well controlled. Continue current medication.",
    },
  ]

  const filteredPrescriptions = pastPrescriptions.filter(
    (prescription) =>
      prescription.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDownload = (prescriptionId: string) => {
    console.log(`[v0] Downloading prescription ${prescriptionId}`)
    alert(`Downloading prescription ${prescriptionId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Past Prescriptions</h3>
          <p className="text-sm text-muted-foreground">Your medical history and completed treatments</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Badge variant="secondary" className="text-sm">
            {filteredPrescriptions.length} Records
          </Badge>
        </div>
      </div>

      {filteredPrescriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? "No matching prescriptions" : "No past prescriptions"}
            </h3>
            <p className="text-muted-foreground text-center">
              {searchTerm
                ? "Try adjusting your search terms to find what you're looking for."
                : "Your prescription history will appear here once you have completed treatments."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="border-l-4 border-l-muted-foreground">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{prescription.condition}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <User className="h-3 w-3" />
                      {prescription.doctorName} ({prescription.specialization})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{prescription.status}</Badge>
                    <span className="text-xs text-muted-foreground">ID: {prescription.id}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(prescription.date).toLocaleDateString()}
                    </div>
                    <span>•</span>
                    <span>{prescription.medicines.length} medicines</span>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <History className="h-5 w-5 text-primary" />
                            Prescription Details - {prescription.id}
                          </DialogTitle>
                          <DialogDescription>
                            Prescribed by {prescription.doctorName} on{" "}
                            {new Date(prescription.date).toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Prescription Info */}
                          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Condition</p>
                              <p className="text-base font-semibold">{prescription.condition}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Status</p>
                              <Badge variant="secondary">{prescription.status}</Badge>
                            </div>
                          </div>

                          {/* Medicines */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3">Prescribed Medications</h4>
                            <div className="space-y-3">
                              {prescription.medicines.map((medicine, index) => (
                                <div key={index} className="p-3 border border-border rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-foreground">{medicine.name}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      {medicine.strength}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Frequency: {medicine.frequency}</span>
                                    <span>•</span>
                                    <span>Duration: {medicine.duration}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Notes */}
                          {prescription.notes && (
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Doctor's Notes</h4>
                              <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                                {prescription.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(prescription.id)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
