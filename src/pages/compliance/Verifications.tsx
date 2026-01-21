import { useState } from "react";
import {
  Search,
  Filter,
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
import VerificationsTable from "@/components/verifications/VerificationsTable";

const statCards = [
  {
    title: "Pending Review",
    value: "23",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-yellow-400",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Approved",
    value: "487",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-green-500",
    icon: <CheckCircle className="size-6 text-white" />,
  },
  {
    title: "Rejected",
    value: "12",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-red-500",
    icon: <XCircle className="size-6 text-white" />,
  },
  {
    title: "Expiring Soon",
    value: "8",
    subtitle: <span className="text-muted-foreground">&nbsp;</span>,
    color: "bg-orange-400",
    icon: <Clock className="size-6 text-white" />,
  },
];

export default function Verifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Document Verifications"
        subtitle="Review and manage driver, partner, and vehicle verifications"
      >
        <div className="flex items-center gap-2">
          <Button className="bg-green-500 hover:bg-green-600">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
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
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Document</SelectItem>
                <SelectItem value="license">Driver License</SelectItem>
                <SelectItem value="background">Background Check</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
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

      <VerificationsTable />
    </div>
  );
}
