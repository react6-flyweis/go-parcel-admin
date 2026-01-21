import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import PageHeader from "@/components/PageHeader";
import AuditsTable from "@/components/audits/AuditsTable";
import ScheduleAuditDialog from "@/components/audits/ScheduleAuditDialog";

const statCards = [
  {
    title: "Scheduled",
    value: "8",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-blue-500",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "In Progress",
    value: "5",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-amber-400",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Completed",
    value: "142",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-green-500",
    icon: <CheckCircle className="size-6 text-white" />,
  },
  {
    title: "Failed",
    value: "12",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-red-500",
    icon: <XCircle className="size-6 text-white" />,
  },
];

export default function Audits() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Safety Audits"
        subtitle="Schedule and manage compliance audits and inspections"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setScheduleOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Audit
          </Button>
          <ScheduleAuditDialog
            open={scheduleOpen}
            onOpenChange={setScheduleOpen}
          />
        </div>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="flex flex-col gap-5">
          <div className="flex gap-5">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 shadow-none"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Audit Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Audit Type</SelectItem>
                <SelectItem value="driver">Driver Safety Audit</SelectItem>
                <SelectItem value="partner">
                  Partner Compliance Audit
                </SelectItem>
                <SelectItem value="vehicle">Vehicle Inspection</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Date Range</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="bg-gray-100">
              <Filter className="" />
              More Filters
            </Button>

            <Button className=" bg-green-500 hover:bg-green-600">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <AuditsTable />
    </div>
  );
}
