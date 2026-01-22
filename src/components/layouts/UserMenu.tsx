import { User, LogOut } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
            SA
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">Admin User</div>
          <div className="text-xs text-gray-500 font-normal">
            admin@goparcel.com
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            <User size={16} className="mr-2" />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/login"
            className="flex items-center text-red-600 focus:text-red-600"
          >
            <LogOut size={16} className="mr-2" />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
