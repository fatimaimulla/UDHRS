"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="mb-25 fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-4.25 shadow-md bg-white">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Unified Health
      </Link>

      {/* Links */}
      <div className="space-x-4">
        <Link href="/patient/login">
          <Button variant="ghost">Patient Portal</Button>
        </Link>
        <Link href="/doctor/login">
          <Button variant="ghost">Doctor Portal</Button>
        </Link>
      </div>
    </nav>
  )
}
