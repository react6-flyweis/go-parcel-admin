import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  Headphones,
  Timer,
  CheckCircle,
  FileText,
} from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import SupportTicketsTab from "@/components/support/SupportTicketsTab";
import CreateTicketDialog from "@/components/support/CreateTicketDialog";
import { useState } from "react";

const statCards = [
  {
    title: "Total Tickets",
    value: "147",
    icon: <FileText className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Open",
    value: "34",
    icon: <Timer className="size-6 text-white" />,
    color: "bg-orange-500",
  },
  {
    title: "In Progress",
    value: "23",
    icon: <Timer className="size-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Resolved Today",
    value: "18",
    icon: <CheckCircle className="size-6 text-white" />,
    color: "bg-green-500",
  },
];

export default function SupportTickets() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Tickets"
        subtitle="Manage customer support tickets, track resolutions, and maintain customer satisfaction"
        Icon={<Headphones className="size-6" />}
        iconColor="bg-purple-600"
      >
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
        >
          <PlusIcon />
          Create Ticket
        </Button>
        <CreateTicketDialog open={open} onOpenChange={setOpen} />
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

      <SupportTicketsTab />
    </div>
  );
}
