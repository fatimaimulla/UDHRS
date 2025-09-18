"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import {  Heart } from "lucide-react"

interface MedicalInfo {
  allergies: string[]
  chronicConditions: string[]
}

interface MedicalInfoCardProps {
  medical: MedicalInfo
}

export function MedicalInfoCard({ medical }: MedicalInfoCardProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Medical Information
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            {/* Allergies */}
            <div>
            <p className="font-medium mb-2">Allergies</p>
            {medical.allergies && medical.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                {medical.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="px-3 py-1.5">
                    {allergy}
                    </Badge>
                ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No known allergies</p>
            )}
            </div>

            {/* Chronic Conditions */}
            <div>
            <p className="font-medium mb-2">Chronic Conditions</p>
            {medical.chronicConditions && medical.chronicConditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                {medical.chronicConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1.5">
                    {condition}
                    </Badge>
                ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No chronic conditions</p>
            )}
            </div>
        </CardContent>
    </Card>
  )
}