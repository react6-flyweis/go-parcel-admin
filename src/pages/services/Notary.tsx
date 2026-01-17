import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/services/FilterPanel";
import {
  Calendar,
  TrendingUp,
  DollarSign,
  PlusIcon,
  CheckCircle,
  TruckIcon,
  Shield,
} from "lucide-react";
import CreateNotaryAppointmentDialog from "@/components/services/CreateNotaryAppointmentDialog";
import StatCard2 from "@/components/services/StatCard2";
import WeeklyAppointmentVolumeChart from "@/components/charts/WeeklyAppointmentVolumeChart";
import NotaryAppointmentsTable from "@/components/services/NotaryAppointmentsTable";

const statCards = [
  {
    title: "Today's Appointments",
    value: "18",
    subtitle: "5 In Progress",
    Icon: <Calendar className="h-8 w-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#9b5cff] to-[#7a2be2]",
  },
  {
    title: "Active Notaries",
    value: "8",
    subtitle: "All certified",
    subtitleClass: "text-xs text-green-600",
    Icon: <Shield className="h-8 w-8 text-purple-600" />,
  },
  {
    title: "Completion Rate",
    value: "98.5%",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        +1.2% vs last week
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Revenue Today",
    value: "$2,450",
    subtitle: "$ 18 appointments",
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function Notary() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2">
            <div className="rounded-lg bg-purple-600 p-2 shadow-lg text-white">
              <TruckIcon />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Mobile Notary Services
            </h1>
          </div>
          <p className="text-muted-foreground">
            Professional notary services at your location
          </p>
        </div>
        <CreateNotaryAppointmentDialog>
          <Button className="bg-green-500 hover:bg-green-600">
            <PlusIcon className="" />
            New Appointment
          </Button>
        </CreateNotaryAppointmentDialog>
      </div>

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

      {/* Weekly Appointment Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Appointment Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyAppointmentVolumeChart />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Notary Appointments Table */}
      <NotaryAppointmentsTable />
    </div>
  );
}
