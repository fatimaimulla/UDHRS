"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PatientCardProps {
  name: string;
  email: string;
  dob: string;
}

export function PatientCard({ name, email, dob }: PatientCardProps) {
  const router = useRouter();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
      </CardHeader>
      <CardContent>
        <p>Date of Birth: {dob}</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/doctor/dashboard/prescription")}
        >
          Select Patient
        </Button>
      </CardContent>
    </Card>
  );
}
