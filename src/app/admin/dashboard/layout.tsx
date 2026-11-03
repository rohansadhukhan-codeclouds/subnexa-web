import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminDashboardShell } from "@/components/admin-dashboard-shell";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Subnexa admin dashboard",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
