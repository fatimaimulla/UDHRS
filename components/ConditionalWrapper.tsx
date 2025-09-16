"use client";

import { usePathname } from "next/navigation";

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Apply margin only on home & login/register pages
  const addMarginOn = ["/", "/doctor/login", "/doctor/register", "/patient/login", "/patient/register"];

  const className = addMarginOn.includes(pathname) ? "mt-15" : "";

  return <main className={className}>{children}</main>;
}
