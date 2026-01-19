// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import PageHeader from "@/components/PageHeader";
import OnboardingTable from "@/components/partners/OnboardingTable";
import {
  // PlusIcon,
  Building2,
  CheckCircle,
  TrendingUp,
  UserCheck,
  Clock,
} from "lucide-react";
import StatCard2 from "@/components/StatCard2";
import MonthlyApplicationsChart from "@/components/charts/MonthlyApplicationsChart";

const statCards = [
  {
    title: "Total Applications",
    value: "67",
    subtitle: "This month",
    Icon: <Building2 className="size-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#A855F7] to-[#C084FC]",
  },
  {
    title: "Pending Review",
    value: "18",
    subtitle: (
      <span className="text-xs text-yellow-600 flex items-center gap-1">
        <Clock className="h-3 w-3 text-yellow-600" />
        Awaiting Action
      </span>
    ),
    Icon: <Clock className="h-8 w-8 text-yellow-600" />,
  },
  {
    title: "Approved",
    value: "42",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <CheckCircle className="h-3 w-3 text-green-600" />
        Approved This Month
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Approval Rate",
    value: "87%",
    subtitle: (
      <span className="text-xs text-green-600 flex gap-1 items-center">
        <TrendingUp className="size-3 text-green-600" />
        +5% vs last month
      </span>
    ),
    Icon: <TrendingUp className="h-8 w-8 text-green-500" />,
  },
];

export default function OnboardingManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Onboarding Management"
        subtitle="Track and manage new driver and partner applications"
        Icon={<UserCheck className="size-6" />}
        iconColor="bg-purple-600"
      >
        {/* <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
          <PlusIcon />
          Add Application
        </Button> */}
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

      {/* Monthly Applications Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyApplicationsChart height={260} />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Onboarding Applications Table */}
      <OnboardingTable />
    </div>
  );
}
