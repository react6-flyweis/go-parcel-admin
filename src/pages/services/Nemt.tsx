import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";

import {
  Calendar,
  TrendingUp,
  Truck,
  DollarSign,
  PlusIcon,
  CheckCircle,
  TruckIcon,
} from "lucide-react";
import CreateNemtBookingDialog from "@/components/services/CreateNemtBookingDialog";
import PageHeader from "@/components/PageHeader";
import WeeklyTripsChart from "@/components/charts/WeeklyTripsChart";
import StatCard2 from "@/components/StatCard2";
import NEMTBookingsTable from "@/components/services/NEMTBookingsTable";

const statCards = [
  {
    title: "Today's Trips",
    value: "24",
    subtitle: "9 In Progress",
    Icon: <Calendar className="size-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#2B7FFF] to-[#155DFC]",
  },
  {
    title: "Active Vehicles",
    value: "12",
    subtitle: "All operational",
    subtitleClass: "text-xs text-green-600",
    Icon: <Truck className="h-8 w-8 text-red-500" />,
  },
  {
    title: "Completion Rate",
    value: "96.8%",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        +2.3% vs last week
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Revenue Today",
    value: "$1,845",
    subtitle: "24 completed trips",
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function Nemt() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="NEMT Services"
        subtitle="Non-Emergency Medical Transportation Management"
        Icon={<TruckIcon />}
        iconColor="bg-red-500"
      >
        <CreateNemtBookingDialog>
          <Button className="bg-green-500 hover:bg-green-600">
            <PlusIcon />
            New Booking
          </Button>
        </CreateNemtBookingDialog>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard2
            key={s.title}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            subtitleClass={s.subtitleClass}
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
          <WeeklyTripsChart />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* NEMT Bookings Table */}

      <NEMTBookingsTable />
    </div>
  );
}
