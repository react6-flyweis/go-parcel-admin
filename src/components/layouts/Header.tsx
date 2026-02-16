import { User, Bell, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import HeaderSearch from "./HeaderSearch";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 px-4 md:px-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* show only in mobile */}
        <div className=" md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex-1">
          <HeaderSearch />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex  bg-green-500 text-white shadow hover:brightness-95"
          >
            <User size={16} />
            <span className="text-sm font-medium">Super Admin</span>
            <ChevronDown size={14} />
          </Button>

          <div className="relative">
            <button
              aria-label="Notifications"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={18} />
            </button>
            <span className="absolute right-1 top-0 inline-block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
