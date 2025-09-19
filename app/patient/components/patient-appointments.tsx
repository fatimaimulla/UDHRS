"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin, Phone, Video, Plus } from "lucide-react"

interface Patient {
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

interface PatientAppointmentsProps {
  patient: Patient
}

export function PatientAppointments({ patient }: PatientAppointmentsProps) {
  // Mock appointments data
  const upcomingAppointments = [
    {
      id: "APT-2024-001",
      doctorName: "Dr. Rajesh Gupta",
      specialization: "Cardiologist",
      date: "2024-02-15",
      time: "10:30 AM",
      type: "Follow-up",
      mode: "In-person",
      location: "City Hospital, Room 205",
      status: "Confirmed",
      notes: "Bring previous test reports",
    },
    {
      id: "APT-2024-002",
      doctorName: "Dr. Priya Sharma",
      specialization: "Endocrinologist",
      date: "2024-02-20",
      time: "2:00 PM",
      type: "Consultation",
      mode: "Video Call",
      location: "Online",
      status: "Confirmed",
      notes: "Diabetes management review",
    },
    {
      id: "APT-2024-003",
      doctorName: "Dr. Amit Kumar",
      specialization: "General Physician",
      date: "2024-02-25",
      time: "11:15 AM",
      type: "Check-up",
      mode: "In-person",
      location: "Health Center, Ground Floor",
      status: "Pending",
      notes: "Annual health screening",
    },
  ]

  const pastAppointments = [
    {
      id: "APT-2024-000",
      doctorName: "Dr. Sunita Patel",
      specialization: "Dermatologist",
      date: "2024-01-10",
      time: "3:30 PM",
      type: "Treatment",
      mode: "In-person",
      status: "Completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default"
      case "Pending":
        return "secondary"
      case "Completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getModeIcon = (mode: string) => {
    return mode === "Video Call" ? Video : MapPin
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upcoming Appointments</h3>
            <p className="text-sm text-muted-foreground">Your scheduled medical appointments</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Appointments</h3>
              <p className="text-muted-foreground text-center mb-4">You don't have any scheduled appointments.</p>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Book Your First Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => {
              const ModeIcon = getModeIcon(appointment.mode)
              return (
                <Card key={appointment.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <User className="h-5 w-5 text-primary" />
                          {appointment.doctorName}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {appointment.specialization} • {appointment.type}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <span className="text-sm text-muted-foreground">ID: {appointment.id}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Appointment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="text-sm font-medium">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ModeIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Mode</p>
                          <p className="text-sm font-medium">{appointment.mode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm font-medium">{appointment.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-1">Important Notes:</p>
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border">
                      {appointment.mode === "Video Call" && (
                        <Button variant="default" size="sm" className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Join Video Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <Phone className="h-4 w-4" />
                        Contact Doctor
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Past Appointments</h3>
            <p className="text-sm text-muted-foreground">Your appointment history</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {pastAppointments.length} Completed
          </Badge>
        </div>

        {pastAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center">No past appointments to display.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-l-4 border-l-muted-foreground">
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-foreground">{appointment.doctorName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appointment.specialization} • {new Date(appointment.date).toLocaleDateString()} at{" "}
                        {appointment.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{appointment.status}</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
