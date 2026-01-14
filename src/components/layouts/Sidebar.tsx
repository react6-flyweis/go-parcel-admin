import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import {
  Sidebar as ShadSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  //   SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  Package,
  Zap,
  FileEdit,
  MapPin,
  Calendar,
  AlertTriangle,
  Bell,
  Search,
  LayoutDashboardIcon,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import logo from "@/assets/go-parcel-logo.svg";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  items?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/",
  },
  {
    title: "Send a Parcel",
    icon: Package,
    href: "/parcels",
    badge: "127",
    items: [
      {
        title: "All Parcels",
        icon: Package,
        href: "/parcels/all",
      },
      {
        title: "Active",
        icon: Zap,
        href: "/parcels/active",
      },
      {
        title: "Create Order",
        icon: FileEdit,
        href: "/parcels/create",
      },
      {
        title: "Tracking",
        icon: MapPin,
        href: "/parcels/live",
      },
      {
        title: "Scheduled",
        icon: Calendar,
        href: "/parcels/scheduled",
      },
      {
        title: "Failed",
        icon: AlertTriangle,
        href: "/parcels/failed",
      },
    ],
  },
  // more nav items...
];

export default function Sidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Check if any child item is active
  const isAnyChildActive = (items?: NavItem[]) => {
    if (!items) return false;
    return items.some((item) => location.pathname === item.href);
  };

  // Initialize and update open groups based on active items
  useEffect(() => {
    const initialOpenGroups: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.items && isAnyChildActive(item.items)) {
        initialOpenGroups[item.title] = true;
      }
    });
    setOpenGroups((prev) => ({ ...prev, ...initialOpenGroups }));
  }, [isAnyChildActive, location.pathname]);

  return (
    <ShadSidebar className="bg-sidebar">
      <SidebarHeader className="border-b border-white/10">
        <div className="mb-4 px-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl overflow-hidden shadow-lg">
              <img
                src={logo}
                alt="GoParcel"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white text-lg font-bold">GoParcel</div>
              <div className="text-xs text-white/80">Admin panel</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Button
              // size="icon"
              className="bg-green-400 size-10 shadow-md"
            >
              <Bell className="size-6" />
            </Button>

            <div className="flex-1 relative">
              <Search className="absolute text-white/40 size-5 left-2 top-1/2 -translate-y-1/2" />
              <SidebarInput
                placeholder="Search"
                className="bg-white/10 border-0 pl-8 placeholder:text-white/50 h-10  text-white/50"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const isCollapsible = item.items && item.items.length > 0;
              if (isCollapsible) {
                const open = !!openGroups[item.title];
                return (
                  <Collapsible
                    key={item.title}
                    open={open}
                    onOpenChange={(v) =>
                      setOpenGroups((s) => ({ ...s, [item.title]: v }))
                    }
                  >
                    <CollapsibleTrigger
                      className="data-[state=open]:bg-white/15"
                      asChild
                    >
                      <SidebarMenuButton className="h-10 w-full justify-between text-white hover:text-white">
                        <div className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`size-4 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="mt-3  grid grid-cols-2 gap-3">
                        {item.items!.map((subItem, idx) => (
                          <SidebarMenuItem key={subItem.title}>
                            <NavLink to={subItem.href}>
                              {({ isActive }) => (
                                <SidebarMenuButton className="p-0 h-20 w-full">
                                  <div className="relative w-full h-full rounded-lg flex flex-col items-center justify-center text-white select-none shadow-sm border border-white/5 overflow-hidden">
                                    <div
                                      className={`flex flex-col items-center justify-center gap-1 w-full h-full px-2 bg-black/15 ${
                                        isActive &&
                                        "bg-green-400 text-white ring-2 ring-white/30"
                                      }`}
                                    >
                                      <subItem.icon className="size-6" />
                                      <span className="text-sm">
                                        {subItem.title}
                                      </span>
                                    </div>

                                    {item.badge && idx === 0 ? (
                                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                        {item.badge}
                                      </span>
                                    ) : null}
                                  </div>
                                </SidebarMenuButton>
                              )}
                            </NavLink>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.href}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        className={`h-10 text-white ${
                          isActive ? "bg-primary" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2">
          <div className="bg-green-400 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
            SA
          </div>
          <div className="text-white">
            <div className="font-semibold text-sm">Super Admin</div>
            <div className="text-xs ">admin@goparcel.com</div>
          </div>
        </div>
      </SidebarFooter>
    </ShadSidebar>
  );
}
