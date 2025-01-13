"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-primary/5 rounded-md">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
