import { Search, User, Bell, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative max-w-lg">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search orders, drivers, partners..."
              className="w-full rounded-xl pl-10 pr-4 py-3"
            />
          </div>
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

          <div className="relative">
            <button className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                SA
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-gray-500">Super Admin</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
