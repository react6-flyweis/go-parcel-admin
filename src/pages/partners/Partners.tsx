import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  Star,
  Clock,
  DollarSign,
  Users,
  Building2,
} from "lucide-react";
import CreatePartnerDialog from "@/components/partners/CreatePartnerDialog";
import StatCard2 from "@/components/StatCard2";
import PartnersTable from "@/components/partners/PartnersTable";
import PartnerGrowthChart from "@/components/charts/PartnerGrowthChart";

const statCards = [
  {
    title: "Total Partners",
    value: "32",
    subtitle: "28 Active",
    Icon: <Building2 className="size-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#6366F1] to-[#7C3AED]",
  },
  {
    title: "Pending Approval",
    value: "4",
    subtitle: "Awaiting review",
    Icon: <Clock className="size-8 text-yellow-500" />,
  },
  {
    title: "Avg Rating",
    value: "4.7",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <Star className="h-3 w-3" />
        Excellent
      </span>
    ),
    Icon: <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />,
  },
  {
    title: "Total Revenue",
    value: "$245K",
    subtitle: <span className="text-xs text-green-600">+18% this month</span>,
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

export default function PartnerManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Partner Management"
        subtitle="Manage partner organizations and service providers"
        Icon={<Users className="size-6" />}
        iconColor="bg-indigo-600"
      >
        <CreatePartnerDialog>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
            <PlusIcon />
            Add Partner
          </Button>
        </CreatePartnerDialog>
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

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Growth (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <PartnerGrowthChart height={260} />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Partners Table */}

      <PartnersTable />
    </div>
  );
}
