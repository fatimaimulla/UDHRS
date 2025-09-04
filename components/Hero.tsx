"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-5xl font-bold text-gray-900 mb-7.25">
        Unified Digital Health Record System
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mb-20">
        Access, manage, and share your medical records seamlessly. Doctors, Patients, and Pharmacies connected under one secure platform.
      </p>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Access Your Portal
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Patient Portal */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Patient Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Access your health records, appointments, and more.
              </p>
              <Link href="/patient/login">
                <Button className="w-full">Sign in as Patient</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Doctor Portal */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Doctor Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Manage patient records, schedules, and clinical workflows.
              </p>
              <Link href="/doctor/login">
                <Button className="w-full">Sign in as Doctor</Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
