import type { RouteObject } from "react-router";

import DashboardLayout from "@/components/layouts/DashboardLayout";

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [],
  },
];
