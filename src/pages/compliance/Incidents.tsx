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
import IncidentsTable from "@/components/incidents/IncidentsTable";
import ReportIncidentDialog from "@/components/incidents/ReportIncidentDialog";

const statCards = [
  {
    title: "Open Incidents",
    value: "12",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-blue-500",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Under Investigation",
    value: "8",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-violet-500",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Resolved This Week",
    value: "34",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-green-500",
    icon: <CheckCircle className="size-6 text-white" />,
  },
  {
    title: "High Severity",
    value: "5",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-red-500",
    icon: <XCircle className="size-6 text-white" />,
  },
];

export default function Incidents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Incident Reports"
        subtitle="Track and manage safety incidents and customer complaints"
      >
        <div className="flex items-center gap-2">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setReportOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
          <ReportIncidentDialog
            open={reportOpen}
            onOpenChange={setReportOpen}
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigation">
                  Under Investigation
                </SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
                <SelectItem value="complaint">Customer Complaint</SelectItem>
                <SelectItem value="violation">Safety Violation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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

      <IncidentsTable />
    </div>
  );
}
