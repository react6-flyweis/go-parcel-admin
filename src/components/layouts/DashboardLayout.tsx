import React from "react";
import Sidebar from "./Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <SidebarInset>
          <Header />
          <div className="p-5">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
