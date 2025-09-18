"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface ProfileCardProps {
  fullName: string
  abhaId: string
  age: number
  gender: string
  bloodGroup: string
}

export function ProfileCard({
  fullName,
  abhaId,
  age,
  gender,
  bloodGroup,
}: ProfileCardProps) {
  return (
    <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-base font-semibold text-foreground">{fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ABHA ID</p>
              <p className="text-base font-mono text-foreground">{abhaId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="text-base text-foreground">{age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-base text-foreground">{gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
              <Badge variant="outline" className="text-base font-semibold">
                {bloodGroup}
              </Badge>
            </div>
          </div>
        </CardContent>
    </Card>
  )
}
