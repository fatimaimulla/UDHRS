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
  

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProfileCard
        fullName={patient.fullName}
        abhaId={patient.abhaId}
        age={patient.age}
        gender={patient.gender}
        bloodGroup={patient.bloodGroup}
      />

      <ContactCard contact={patient.contact} />

      <MedicalInfoCard medical={patient.medical} />

      <EmergencyDetailsCard
        fullName={patient.fullName}
        age={patient.age}
        gender={patient.gender}
        bloodGroup={patient.bloodGroup}
        emergencyContact={patient.emergencyContact}
        medical={patient.medical}
      />

    </div>
  )
}
