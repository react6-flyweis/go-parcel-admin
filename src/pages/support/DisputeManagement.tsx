import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  Scale,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import DisputeManagementTab from "@/components/support/DisputeManagementTab";

const statCards = [
  {
    title: "Total Disputes",
    value: "28",
    icon: <AlertCircle className="size-6 text-white" />,
    color: "bg-red-500",
  },
  {
    title: "Open Cases",
    value: "12",
    icon: <Clock className="size-6 text-white" />,
    color: "bg-orange-500",
  },
  {
    title: "Under Review",
    value: "8",
    icon: <Scale className="size-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Resolved This Month",
    value: "87",
    icon: <CheckCircle2 className="size-6 text-white" />,
    color: "bg-green-500",
  },
];

export default function DisputeManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dispute Management"
        subtitle="Handle customer disputes, review evidence, and resolve conflicts fairly"
        Icon={<Scale className="size-6" />}
        iconColor="bg-red-600"
      >
        <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
          <PlusIcon />
          Create Dispute
        </Button>
      </PageHeader>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      <DisputeManagementTab />
    </div>
  );
}
