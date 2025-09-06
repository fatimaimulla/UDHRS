"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pill, Clock, Calendar, Download, Eye } from "lucide-react"

interface Patient {
  abhaId: string
  name: string
  age: number
  gender: string
}

interface ActivePrescriptionsProps {
  patient: Patient
}

export function ActivePrescriptions({ patient }: ActivePrescriptionsProps) {
  // Mock active prescriptions data
  const activePrescriptions = [
    {
      id: "RX-2024-001",
      doctorName: "Dr. Rajesh Gupta",
      specialization: "Cardiologist",
      date: "2024-01-15",
      condition: "Hypertension",
      medicines: [
        { name: "Amlodipine", strength: "5mg", frequency: "OD", duration: "30 days", remaining: 15 },
        { name: "Metoprolol", strength: "25mg", frequency: "BD", duration: "30 days", remaining: 15 },
      ],
      status: "Active",
      nextReview: "2024-02-15",
    },
    {
      id: "RX-2024-002",
      doctorName: "Dr. Priya Sharma",
      specialization: "Endocrinologist",
      date: "2024-01-20",
      condition: "Diabetes Type 2",
      medicines: [
        { name: "Metformin", strength: "500mg", frequency: "BD", duration: "90 days", remaining: 75 },
        { name: "Glimepiride", strength: "2mg", frequency: "OD", duration: "90 days", remaining: 75 },
      ],
      status: "Active",
      nextReview: "2024-04-20",
    },
  ]

  const handleDownload = (prescriptionId: string) => {
    console.log(`[v0] Downloading prescription ${prescriptionId}`)
    // Mock download functionality
    alert(`Downloading prescription ${prescriptionId}`)
  }

  const handleView = (prescriptionId: string) => {
    console.log(`[v0] Viewing prescription ${prescriptionId}`)
    // Mock view functionality
    alert(`Viewing detailed prescription ${prescriptionId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Prescriptions</h3>
          <p className="text-sm text-muted-foreground">Current medications and treatments</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {activePrescriptions.length} Active
        </Badge>
      </div>

      {activePrescriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Pill className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Active Prescriptions</h3>
            <p className="text-muted-foreground text-center">You don't have any active prescriptions at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {activePrescriptions.map((prescription) => (
            <Card key={prescription.id} className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Pill className="h-5 w-5 text-primary" />
                      {prescription.condition}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Prescribed by {prescription.doctorName} ({prescription.specialization})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-accent text-accent-foreground">
                      {prescription.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">ID: {prescription.id}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prescription Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Prescribed</p>
                      <p className="text-sm font-medium">{new Date(prescription.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Next Review</p>
                      <p className="text-sm font-medium">{new Date(prescription.nextReview).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Medicines</p>
                      <p className="text-sm font-medium">{prescription.medicines.length} items</p>
                    </div>
                  </div>
                </div>

                {/* Medicines List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Medications</h4>
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-foreground">{medicine.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            {medicine.strength}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{medicine.frequency}</span>
                          <span>•</span>
                          <span>{medicine.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{medicine.remaining} days left</p>
                        <div className="w-20 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{ width: `${(medicine.remaining / Number.parseInt(medicine.duration)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(prescription.id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(prescription.id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
