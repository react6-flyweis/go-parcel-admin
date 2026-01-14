import { lazy } from "react";
import type { RouteObject } from "react-router";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { NotFound } from "@/pages/not-found";

const DashboardOverview = lazy(
  () => import("@/pages/overview/DashboardOverview")
);

// send a parcel section
const AllParcels = lazy(() => import("@/pages/parcels/AllParcels"));
const ActiveDeliveries = lazy(() => import("@/pages/parcels/ActiveDeliveries"));
const ScheduledDeliveries = lazy(
  () => import("@/pages/parcels/ScheduledDeliveries")
);
const FailedDeliveries = lazy(() => import("@/pages/parcels/FailedDeliveries"));
const LiveParcelTracking = lazy(
  () => import("@/pages/parcels/LiveParcelTracking")
);
const CreateParcelOrder = lazy(
  () => import("@/pages/parcels/CreateParcelOrder")
);

export const Routes: RouteObject[] = [
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

      // Additional routes can be added here

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
];
