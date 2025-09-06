"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Heart, Phone, Mail, MapPin } from "lucide-react"

interface Patient {
  abhaId: string
  name: string
  age: number
  gender: string
}

interface PatientProfileProps {
  patient: Patient
}

export function PatientProfile({ patient }: PatientProfileProps) {
  // Mock additional patient data
  const profileData = {
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    email: "patient@example.com",
    address: "123 Health Street, Medical City, State 110001",
    emergencyContact: "Dr. Sarah Wilson - +91 87654 32109",
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Hypertension", "Diabetes Type 2"],
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-base font-semibold text-foreground">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ABHA ID</p>
              <p className="text-base font-mono text-foreground">{patient.abhaId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="text-base text-foreground">{patient.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-base text-foreground">{patient.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
              <Badge variant="outline" className="text-base font-semibold">
                {profileData.bloodGroup}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Details
          </CardTitle>
          <CardDescription>How to reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-base text-foreground">{profileData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base text-foreground">{profileData.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-base text-foreground">{profileData.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Medical Information
          </CardTitle>
          <CardDescription>Important health details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {profileData.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Chronic Conditions</p>
            <div className="flex flex-wrap gap-2">
              {profileData.chronicConditions.map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Emergency Contact
          </CardTitle>
          <CardDescription>In case of emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-base font-semibold text-foreground mb-1">Primary Contact</p>
            <p className="text-sm text-muted-foreground">{profileData.emergencyContact}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
