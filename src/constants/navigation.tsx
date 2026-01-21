import {
  Package,
  Zap,
  Headphones,
  MessageSquare,
  HelpCircle,
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
  Key,
  Wrench,
  Receipt,
  Wallet,
  RotateCcw,
  ChartBar,
  Shield,
  ShieldCheck,
  UserCog,
  UserCircle,
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

  // fleet management
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

  // payments and Finance

  {
    title: "Payments & Finance",
    icon: DollarSign,
    href: "/payments",
    items: [
      {
        title: "Transactions",
        icon: Receipt,
        href: "/payments/transactions",
      },
      {
        title: "Payouts",
        icon: Wallet,
        href: "/payments/payouts",
      },
      {
        title: "Refunds",
        icon: RotateCcw,
        href: "/payments/refunds",
      },
      {
        title: "Reports",
        icon: ChartBar,
        href: "/payments/reports",
      },
    ],
  },

  // support and disputes
  {
    title: "Support & Disputes",
    icon: Headphones,
    href: "/support",
    items: [
      {
        title: "Tickets",
        icon: MessageSquare,
        href: "/support/tickets",
      },
      {
        title: "Live Chat",
        icon: Activity,
        href: "/support/live-chat",
      },
      {
        title: "Disputes",
        icon: AlertTriangle,
        href: "/support/disputes",
      },
      {
        title: "FAQ",
        icon: HelpCircle,
        href: "/support/faq",
      },
    ],
  },

  // compliance and safety
  {
    title: "Compliance & Safety",
    icon: Shield,
    href: "/compliance",
    items: [
      {
        title: "Verifications",
        icon: ShieldCheck,
        href: "/compliance/verifications",
      },
      {
        title: "Incidents",
        icon: AlertTriangle,
        href: "/compliance/incidents",
      },
      {
        title: "Audits",
        icon: FileText,
        href: "/compliance/audits",
      },
    ],
  },

  // users and roles
  {
    title: "Users & Roles",
    icon: Users,
    href: "/users",
    items: [
      {
        title: "Admins",
        icon: UserCog,
        href: "/users/admins",
      },
      {
        title: "Customers",
        icon: UserCircle,
        href: "/users/customers",
      },
      {
        title: "Permissions",
        icon: Key,
        href: "/users/permissions",
      },
    ],
  },

  // support

  // more nav items...
];
