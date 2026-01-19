import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import CreateMovingJobDialog from "@/components/services/CreateMovingJobDialog";
import PageHeader from "@/components/PageHeader";

import {
  Calendar,
  TrendingUp,
  Truck,
  DollarSign,
  PlusIcon,
  CheckCircle,
  Move,
} from "lucide-react";
import WeeklyMovingJobsChart from "@/components/charts/WeeklyMovingJobsChart";
import StatCard2 from "@/components/StatCard2";
import MovingJobsTable from "@/components/services/MovingJobsTable";

const statCards = [
  {
    title: "Today's Moves",
    value: "12",
    subtitle: "3 In Progress",
    Icon: <Calendar className="h-8 w-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#FF7A00] to-[#FF9900]",
  },
  {
    title: "Active Crews",
    value: "6",
    subtitle: "All available",
    subtitleClass: "text-xs text-green-600",
    Icon: <Truck className="h-8 w-8 text-orange-500" />,
  },
  {
    title: "Completion Rate",
    value: "97.2%",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        +3.1% vs last week
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Revenue Today",
    value: "$8,450",
    subtitle: "$12 completed jobs",
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function Moving() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Moving Services"
        subtitle="Professional residential and commercial moving"
        Icon={<Move />}
        iconColor="bg-orange-500"
      >
        <CreateMovingJobDialog>
          <Button className="bg-green-500 hover:bg-green-600">
            <PlusIcon />
            New Moving Job
          </Button>
        </CreateMovingJobDialog>
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

      {/* Weekly Moving Jobs Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Moving Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyMovingJobsChart />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Moving Jobs Table */}

      <MovingJobsTable />
    </div>
  );
}
