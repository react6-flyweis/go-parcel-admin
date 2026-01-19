import {
  Package,
  Zap,
  FileEdit,
  MapPin,
  Truck,
  History,
  DollarSign,
  Calendar,
  AlertTriangle,
  LayoutDashboardIcon,
  Users,
  Stethoscope,
  Ambulance,
  FileText,
  Move,
  Bus,
  TrendingUp,
  type LucideIcon,
  Activity,
  Building2,
  UserCheck,
  Wrench,
} from "lucide-react";

export interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  items?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
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
        badge: "127",
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

  {
    title: "Rides",
    icon: Truck,
    href: "/rides",
    badge: "84",
    items: [
      {
        title: "All Rides",
        icon: Truck,
        href: "/rides/all",
      },
      {
        title: "Active Trips",
        icon: Activity,
        badge: "84",
        href: "/rides/active",
      },
      {
        title: "History",
        icon: History,
        href: "/rides/history",
      },
      {
        title: "Pricing",
        icon: DollarSign,
        href: "/rides/pricing",
      },
      // add more ride-related items here if needed
    ],
  },

  {
    title: "Specialized Services",
    icon: Stethoscope,
    href: "/services",
    items: [
      {
        title: "NEMT",
        icon: Ambulance,
        href: "/services/nemt",
      },
      {
        title: "Notary",
        icon: FileText,
        href: "/services/notary",
      },
      {
        title: "Movers",
        icon: Move,
        href: "/services/movers",
      },
      {
        title: "Shuttle",
        icon: Bus,
        href: "/services/shuttle",
      },
    ],
  },

  // Partners & Drivers
  {
    title: "Partners & Drivers",
    icon: Users,
    href: "/partners",
    items: [
      {
        title: "Partners",
        icon: Building2,
        href: "/partners/all",
      },
      {
        title: "Drivers",
        icon: Users,
        href: "/partners/drivers",
      },
      {
        title: "Onboarding",
        icon: UserCheck,
        href: "/partners/onboarding",
      },
      {
        title: "Performance",
        icon: TrendingUp,
        href: "/partners/performance",
      },
    ],
  },

  {
    title: "Fleet Management",
    icon: Truck,
    href: "/fleet",
    items: [
      {
        title: "Vehicles",
        icon: Truck,
        href: "/fleet/vehicles",
      },
      {
        title: "Maintenance",
        icon: Wrench,
        href: "/fleet/maintenance",
      },
      {
        title: "Tracking",
        icon: MapPin,
        href: "/fleet/tracking",
      },
    ],
  },

  // more nav items...
];
