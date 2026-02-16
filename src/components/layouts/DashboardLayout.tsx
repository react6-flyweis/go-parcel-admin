import Sidebar from "./Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset className="min-w-0">
        <Header />
        <div className="p-4 md:p-5 bg-[#F9FAFB]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
