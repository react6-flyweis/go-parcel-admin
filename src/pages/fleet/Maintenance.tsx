import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  Wrench,
  Clock,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import ScheduleServiceDialog from "@/components/fleet/ScheduleServiceDialog";
import StatCard2 from "@/components/StatCard2";
import MonthlyMaintenanceCostsChart from "@/components/charts/MonthlyMaintenanceCostsChart";
import ServiceTypeDistributionChart from "@/components/charts/ServiceTypeDistributionChart";
import MaintenanceRecordsTable from "@/components/fleet/MaintenanceRecordsTable";

const statCards = [
  {
    title: "Total Services",
    value: "145",
    subtitle: "This month",
    Icon: <Wrench className="h-8 w-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#FF7A18] to-[#FF4E00]",
  },
  {
    title: "In Progress",
    value: "8",
    subtitle: (
      <span className="text-xs text-purple-600 flex items-center gap-1">
        <Clock className="h-3 w-3 text-purple-600" />
        Being serviced
      </span>
    ),
    Icon: <Clock className="h-8 w-8 text-purple-600" />,
  },
  {
    title: "Overdue",
    value: "5",
    subtitle: (
      <span className="text-xs text-red-600 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3 text-red-600" />
        Needs attention
      </span>
    ),
    Icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
  },
  {
    title: "Monthly Cost",
    value: "$4.9K",
    subtitle: (
      <span className="text-xs text-green-600 flex gap-1 items-center">
        <DollarSign className="h-3 w-3 text-green-600" />
        This month
      </span>
    ),
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function MaintenanceManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Management"
        subtitle="Track and schedule vehicle maintenance and repairs"
        Icon={<Wrench className="h-6 w-6" />}
        iconColor="bg-amber-500"
      >
        <ScheduleServiceDialog>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
            <PlusIcon />
            Schedule Service
          </Button>
        </ScheduleServiceDialog>
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
            <CardTitle>Monthly Maintenance Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyMaintenanceCostsChart height={260} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceTypeDistributionChart height={260} />
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Maintenance Records Table (extracted) */}
      <MaintenanceRecordsTable />
    </div>
  );
}
