"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Define where navbar should show
  const showNavbarOn = ["/", "/doctor/login", "/doctor/register", "/patient/login", "/patient/register"];

  if (!showNavbarOn.includes(pathname)) {
    return null; 
  }

  return <Navbar />;
}