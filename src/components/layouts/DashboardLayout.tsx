import Sidebar from "./Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <SidebarInset>
          <Header />
          <div className="p-5 bg-[#F9FAFB]">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
