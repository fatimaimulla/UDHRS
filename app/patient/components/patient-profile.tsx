"use client"

import { EmergencyDetailsCard } from "./EmergencyDetailsCard"
import { ProfileCard } from "./ProfileCard"
import { ContactCard } from "./ContactCard"
import { MedicalInfoCard } from "./MedicalInfoCard"

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

interface PatientProfileProps {
  patient: Patient
}

export function PatientProfile({ patient }: PatientProfileProps) {
  // Mock additional patient data
  const mockPatient = {
  fullName: "Rajesh Kumar",
  age: 20,
  gender: "Male",
  bloodGroup: "A+",
  abhaId: "12-1234-1234-1234",
  emergencyContact: {
    name: "Dr. Sarah Wilson",
    relation: "Primary Contact",
    phone: "+91 87654 32109",
  },
  medical: {
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Hypertension", "Diabetes Type 2"],
  },
  contact: {
    phone: "+91 94224 95181",
    email: "workingaaru@gmail.com",
    address: {
      line1: "123 Health Street",
      city: "Medical City",
      state: "State",
      postalCode: "110001",
      country: "India",
    },
  }
}


  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProfileCard
        fullName={mockPatient.fullName}
        abhaId={mockPatient.abhaId}
        age={mockPatient.age}
        gender={mockPatient.gender}
        bloodGroup={mockPatient.bloodGroup}
      />

      <ContactCard contact={mockPatient.contact} />

      <MedicalInfoCard medical={mockPatient.medical} />

      <EmergencyDetailsCard
        fullName={mockPatient.fullName}
        age={mockPatient.age}
        gender={mockPatient.gender}
        bloodGroup={mockPatient.bloodGroup}
        emergencyContact={mockPatient.emergencyContact}
        medical={mockPatient.medical}
      />

    </div>
  )
}
