import { lazy } from "react";
import type { RouteObject } from "react-router";

import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardOverview = lazy(
  () => import("@/pages/overview/DashboardOverview")
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
      // Additional routes can be added here
    ],
  },
];
