"use client";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/doctor/dashboard" },
  { label: "Create Prescription", href: "/doctor/dashboard/prescription" },
  { label: "View Prescriptions", href: "/doctor/dashboard/history" },
  { label: "Patient Records", href: "/doctor/dashboard/records" },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Doctor Portal</h2>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
