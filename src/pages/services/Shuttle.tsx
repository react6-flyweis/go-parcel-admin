import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/services/FilterPanel";
import CreateShuttleRouteDialog from "@/components/services/CreateShuttleRouteDialog";

import {
  Calendar,
  TrendingUp,
  DollarSign,
  PlusIcon,
  Bus,
  Users,
} from "lucide-react";
import StatCard2 from "@/components/services/StatCard2";
import WeeklyTripsChartShuttle from "@/components/charts/WeeklyTripsChartShuttle";
import ShuttleRoutesTable from "@/components/services/ShuttleRoutesTable";

const statCards = [
  {
    title: "Active Routes",
    value: "18",
    subtitle: "6 organizations",
    Icon: (
      <div className="rounded-lg bg-white/20 p-2 text-white">
        <Bus className="h-6 w-6" />
      </div>
    ),
    className: "text-white bg-gradient-to-r from-teal-400 to-cyan-500",
  },
  {
    title: "Today's Trips",
    value: "145",
    subtitle: <span className="text-xs text-green-600">98% on time</span>,
    Icon: <Calendar className="h-8 w-8 text-slate-600" />,
  },
  {
    title: "Passengers Today",
    value: "2,450",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        +5% vs yesterday
      </span>
    ),
    Icon: <Users className="h-8 w-8 text-slate-600" />,
  },
  {
    title: "Monthly Revenue",
    value: "$185K",
    subtitle: "$18 contracts",
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function Shuttle() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <div className="rounded-lg bg-teal-500 p-2 shadow-lg text-white">
              <Bus className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Shuttle Services
            </h1>
          </div>
          <p className="text-muted-foreground">
            Corporate and institutional shuttle management
          </p>
        </div>
        <CreateShuttleRouteDialog>
          <Button className="bg-green-500 hover:bg-green-600">
            <PlusIcon />
            New Shuttle Route
          </Button>
        </CreateShuttleRouteDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
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

      {/* Weekly Trip Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trip Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyTripsChartShuttle />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Shuttle routes Table */}

      <ShuttleRoutesTable />
    </div>
  );
}
