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

      // Rides
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

      // Services
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
          // Additional service routes can be added here
        ],
      },

      // Additional routes can be added here

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
];
