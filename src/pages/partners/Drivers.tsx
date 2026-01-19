import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import DriversTable from "@/components/partners/DriversTable";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  Star,
  DollarSign,
  User,
  Building2,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import StatCard2 from "@/components/StatCard2";
import WeeklyTripsCompletedChart from "@/components/charts/WeeklyTripsCompletedChart";
import WeeklyEarningsChart from "@/components/charts/WeeklyEarningsChart";
import CreateDriverDialog from "@/components/partners/CreateDriverDialog";

const statCards = [
  {
    title: "Total Drivers",
    value: "245",
    subtitle: "178 Online",
    Icon: <Building2 className="size-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#2B7FFF] to-[#155DFC]",
  },
  {
    title: "Active Now",
    value: "142",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <CheckCircle className="h-3 w-3 text-green-600" />
        58% online rate
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Avg Rating",
    value: "4.8",
    subtitle: (
      <span className="text-xs text-yellow-600 flex items-center gap-1">
        <Star className="h-3 w-3 text-yellow-600 fill-yellow-600" />
        Excellent
      </span>
    ),
    Icon: <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />,
  },
  {
    title: "Total Earnings",
    value: "$345K",
    subtitle: (
      <span className="text-xs text-green-600 flex gap-1 items-center">
        <TrendingUp className="size-3 text-green-600" />
        12% this week
      </span>
    ),
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function DriverManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Driver Management"
        subtitle="Manage drivers, assignments, and performance"
        Icon={<User className="size-6" />}
        iconColor="bg-indigo-600"
      >
        <CreateDriverDialog>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
            <PlusIcon />
            Add Driver
          </Button>
        </CreateDriverDialog>
      </PageHeader>

      {/* Stat cards */}
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

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trips Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyTripsCompletedChart height={260} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyEarningsChart height={260} />
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Drivers Table */}
      <DriversTable />
    </div>
  );
}
