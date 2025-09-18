"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

interface Address {
  line1: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface Contact {
  phone: string
  email: string
  address: Address
}

interface ContactCardProps {
  contact: Contact
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-base text-foreground">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base text-foreground">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                {/* <p className="text-base text-foreground">{profileData.address}</p> */}
                <div>
                    <p>{contact.address.line1}</p>
                    <p>
                    {contact.address.city}, {contact.address.state}{" "}
                    {contact.address.postalCode}
                    </p>
                    <p>{contact.address.country}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
    </Card>
  )
}