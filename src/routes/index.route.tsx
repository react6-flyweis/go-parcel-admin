import { lazy } from "react";
import type { RouteObject } from "react-router";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { NotFound } from "@/pages/not-found";

// Auth routes
const Login = lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

const DashboardOverview = lazy(
  () => import("@/pages/overview/DashboardOverview"),
);

// send a parcel section
const AllParcels = lazy(() => import("@/pages/parcels/AllParcels"));
const ActiveDeliveries = lazy(() => import("@/pages/parcels/ActiveDeliveries"));
const ScheduledDeliveries = lazy(
  () => import("@/pages/parcels/ScheduledDeliveries"),
);
const FailedDeliveries = lazy(() => import("@/pages/parcels/FailedDeliveries"));
const LiveParcelTracking = lazy(
  () => import("@/pages/parcels/LiveParcelTracking"),
);
const CreateParcelOrder = lazy(
  () => import("@/pages/parcels/CreateParcelOrder"),
);

// Rides routes
const AllRides = lazy(() => import("@/pages/ride/AllRides"));
const ActiveTrips = lazy(() => import("@/pages/ride/ActiveTrips"));
const RideHistory = lazy(() => import("@/pages/ride/History"));
const RidePricing = lazy(() => import("@/pages/ride/Pricing"));

// Services routes
const Nemt = lazy(() => import("@/pages/services/Nemt"));
const Notary = lazy(() => import("@/pages/services/Notary"));
const Moving = lazy(() => import("@/pages/services/Moving"));
const Shuttle = lazy(() => import("@/pages/services/Shuttle"));

// partners screens
const Partners = lazy(() => import("@/pages/partners/Partners"));
const Drivers = lazy(() => import("@/pages/partners/Drivers"));
const Onboarding = lazy(() => import("@/pages/partners/Onboarding"));
const Performance = lazy(() => import("@/pages/partners/Performance"));

// fleet management screens
const Vehicles = lazy(() => import("@/pages/fleet/Vehicles"));
const Tracking = lazy(() => import("@/pages/fleet/Tracking"));
const Maintenance = lazy(() => import("@/pages/fleet/Maintenance"));

// transactions screen
const AllTransactions = lazy(() => import("@/pages/payments/Transactions"));
const AllPayouts = lazy(() => import("@/pages/payments/Payouts"));
const AllRefunds = lazy(() => import("@/pages/payments/Refunds"));
const AllReports = lazy(() => import("@/pages/payments/Reports"));

// support screens
const SupportTickets = lazy(() => import("@/pages/support/SupportTickets"));
const DisputeManagement = lazy(
  () => import("@/pages/support/DisputeManagement"),
);
const LiveChatSupport = lazy(() => import("@/pages/support/LiveChatSupport"));
const FAQManagement = lazy(() => import("@/pages/support/FAQManagement"));

// Compliance screens

const Verifications = lazy(() => import("@/pages/compliance/Verifications"));
const Incidents = lazy(() => import("@/pages/compliance/Incidents"));
const Audits = lazy(() => import("@/pages/compliance/Audits"));

// user and roles screens
const Admins = lazy(() => import("@/pages/users/Admins"));
const Customers = lazy(() => import("@/pages/users/Customers"));
const Permissions = lazy(() => import("@/pages/users/Permissions"));

export const Routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },

      // send a parcel routes
      {
        path: "parcels",
        children: [
          {
            path: "all",
            element: <AllParcels />,
          },
          {
            path: "active",
            element: <ActiveDeliveries />,
          },
          {
            path: "live",
            element: <LiveParcelTracking />,
          },
          {
            path: "scheduled",
            element: <ScheduledDeliveries />,
          },
          {
            path: "failed",
            element: <FailedDeliveries />,
          },
          {
            path: "create",
            element: <CreateParcelOrder />,
          },
          // Additional parcel routes can be added here
        ],
      },

      // Rides routes
      {
        path: "rides",
        children: [
          {
            path: "all",
            element: <AllRides />,
          },
          {
            path: "active",
            element: <ActiveTrips />,
          },
          {
            path: "history",
            element: <RideHistory />,
          },
          {
            path: "pricing",
            element: <RidePricing />,
          },

          // Additional ride routes can be added here
        ],
      },

      // Services routes
      {
        path: "services",
        children: [
          {
            path: "nemt",
            element: <Nemt />,
          },
          {
            path: "notary",
            element: <Notary />,
          },
          {
            path: "movers",
            element: <Moving />,
          },
          {
            path: "shuttle",
            element: <Shuttle />,
          },
        ],
      },

      // Partners routes
      {
        path: "partners",
        children: [
          {
            path: "all",
            element: <Partners />,
          },
          {
            path: "onboarding",
            element: <Onboarding />,
          },
          {
            path: "drivers",
            element: <Drivers />,
          },
          {
            path: "performance",
            element: <Performance />,
          },
        ],
      },

      // Fleet routes
      {
        path: "fleet",
        children: [
          {
            path: "vehicles",
            element: <Vehicles />,
          },
          {
            path: "tracking",
            element: <Tracking />,
          },
          {
            path: "maintenance",
            element: <Maintenance />,
          },
        ],
      },

      // payments and finance routes
      {
        path: "payments",
        children: [
          {
            path: "transactions",
            element: <AllTransactions />,
          },
          {
            path: "payouts",
            element: <AllPayouts />,
          },
          {
            path: "refunds",
            element: <AllRefunds />,
          },
          {
            path: "reports",
            element: <AllReports />,
          },
        ],
      },

      // support routes
      {
        path: "support",
        children: [
          {
            path: "tickets",
            element: <SupportTickets />,
          },
          {
            path: "disputes",
            element: <DisputeManagement />,
          },
          {
            path: "live-chat",
            element: <LiveChatSupport />,
          },
          {
            path: "faq",
            element: <FAQManagement />,
          },
        ],
      },

      // compliance routes
      {
        path: "compliance",
        children: [
          {
            path: "incidents",
            element: <Incidents />,
          },
          {
            path: "verifications",
            element: <Verifications />,
          },
          {
            path: "audits",
            element: <Audits />,
          },
        ],
      },

      // user and roles routes
      {
        path: "users",
        children: [
          {
            path: "admins",
            element: <Admins />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "permissions",
            element: <Permissions />,
          },
        ],
      },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
];
