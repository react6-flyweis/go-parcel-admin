import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import {
  Download,
  MapPin,
  TrendingUp,
  Activity,
  Navigation,
  Zap,
  Target,
} from "lucide-react";
import { LiveVehicleMap } from "@/components/overview/LiveVehicleMap";
import StatCard2 from "@/components/StatCard2";
import FilterPanel from "@/components/FilterPanel";

import WeeklyDistanceChart from "@/components/charts/WeeklyDistanceChart";
import HourlyFleetActivityChart from "@/components/charts/HourlyFleetActivityChart";
import LiveVehicleTrackingTable from "@/components/fleet/LiveVehicleTrackingTable";

const statCards = [
  {
    title: "Active Vehicles",
    value: "67",
    subtitle: "54% of fleet",
    Icon: <Activity className="h-8 w-8 text-white" />,
    className:
      "text-white bg-linear-to-b from-[#00C950] to-[#00A63E] shadow-lg",
  },
  {
    title: "Moving",
    value: "42",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <Navigation className="h-3 w-3 text-green-600" />
        On route
      </span>
    ),
    Icon: <Navigation className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Avg Speed",
    value: "32",
    subtitle: (
      <span className="text-xs text-blue-600 flex items-center gap-1">
        <Zap className="h-3 w-3 text-blue-600" />
        mph
      </span>
    ),
    Icon: <Zap className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Total Distance",
    value: "2.8K",
    subtitle: (
      <span className="text-xs text-violet-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3 text-violet-600" />
        mi today
      </span>
    ),
    Icon: <Target className="h-8 w-8 text-violet-600" />,
  },
];

export default function Tracking() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Real-Time Fleet Tracking"
        subtitle="Monitor vehicle locations, routes, and performance"
        Icon={<Navigation className="h-6 w-6" />}
        iconColor="bg-linear-to-b from-[#00C950] to-[#00A63E]"
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Map View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white text-slate-700"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard2
            key={s.title}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            Icon={s.Icon}
            className={s.className}
          />
        ))}
      </div>

      <LiveVehicleMap />

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Fleet Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <HourlyFleetActivityChart height={260} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Distance Traveled</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyDistanceChart height={260} />
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Live Vehicle Tracking Table */}
      <LiveVehicleTrackingTable />
    </div>
  );
}
