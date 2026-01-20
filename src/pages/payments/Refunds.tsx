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
import RefundsTable from "@/components/payments/RefundsTable";
import ProcessRefundDialog from "@/components/payments/ProcessRefundDialog";

const statCards = [
  {
    title: "Pending Review",
    value: "12",
    subtitle: <span className="text-muted-foreground">$1,245</span>,
    color: "bg-yellow-400",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Processing",
    value: "8",
    subtitle: <span className="text-muted-foreground">$892</span>,
    color: "bg-blue-500",
    icon: <Clock className="size-6 text-white" />,
  },
  {
    title: "Approved This Week",
    value: "34",
    subtitle: <span className="text-muted-foreground">$3,420</span>,
    color: "bg-green-500",
    icon: <CheckCircle className="size-6 text-white" />,
  },
  {
    title: "Rejected",
    value: "5",
    subtitle: <span className="text-muted-foreground">$687</span>,
    color: "bg-red-500",
    icon: <XCircle className="size-6 text-white" />,
  },
];

export default function Refunds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [openRefundDialog, setOpenRefundDialog] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Refunds & Chargebacks"
        subtitle="Manage customer refund requests and chargebacks"
      >
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setOpenRefundDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Process Refund
          </Button>
          <ProcessRefundDialog
            open={openRefundDialog}
            onOpenChange={setOpenRefundDialog}
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
            iconDirection="right"
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
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending Pickup</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="same-day">Same-Day</SelectItem>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
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
                <SelectItem value="custom">Custom Range</SelectItem>
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

      {/* Refunds Table (extracted) */}
      <RefundsTable />
    </div>
  );
}
