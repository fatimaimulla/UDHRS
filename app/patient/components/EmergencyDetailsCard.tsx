"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

interface MedicalInfo {
  allergies: string[]
  chronicConditions: string[]
}

interface EmergencyDetailsCardProps {
  fullName: string
  age: number
  gender: string
  bloodGroup: string
  emergencyContact: EmergencyContact
  medical: MedicalInfo
}

export function EmergencyDetailsCard({
  fullName,
  age,
  gender,
  bloodGroup,
  emergencyContact,
  medical,
}: EmergencyDetailsCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [contact, setContact] = useState(emergencyContact)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // 🔥 Later: Call backend API to update contact info
    console.log("Updated Emergency Contact:", contact)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <CardTitle>Emergency Contact</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="flex flex-wrap gap-6">
          <p><span className="font-medium">Name:</span> {fullName}</p>
          <p><span className="font-medium">Age:</span> {age}</p>
          <p><span className="font-medium">Gender:</span> {gender}</p>
          <p><span className="font-medium">Blood Group:</span> {bloodGroup}</p>
        </div>

        {/* Medical Info */}
        <div>
          <p className="font-medium">Allergies:</p>
          <ul className="list-disc ml-5 text-sm">
            {medical.allergies.length > 0 ? (
              medical.allergies.map((a, i) => <li key={i}>{a}</li>)
            ) : (
              <li>None</li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-medium">Chronic Conditions:</p>
          <ul className="list-disc ml-5 text-sm">
            {medical.chronicConditions.length > 0 ? (
              medical.chronicConditions.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <li>None</li>
            )}
          </ul>
        </div>

        {/* Emergency Contact */}
        <div>
          <p className="font-medium mb-2">Emergency Contact:</p>
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={contact.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="relation">Relation</Label>
                <Input id="relation" name="relation" value={contact.relation} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={contact.phone} onChange={handleChange} />
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>Save</Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div>
              <p>{contact.name} ({contact.relation})</p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Contact
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
