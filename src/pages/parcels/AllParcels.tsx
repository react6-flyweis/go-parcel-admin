import { useState } from "react";
import { Search, Filter, Download, CarIcon } from "lucide-react";
import CreateParcelDialog from "@/components/parcels/CreateParcelDialog";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

// Sample data
const parcelsData = [
  {
    id: "ORD-2024-1234",
    sender: "John Doe",
    recipient: "Jane Smith",
    status: "In Transit",
    parcelType: "Same-Day",
    destination: "N/A",
    deliveryFee: "$45.50",
  },
  {
    id: "ORD-2024-1235",
    sender: "FreshMart Store",
    recipient: "Bob Anderson",
    status: "Pickup",
    parcelType: "Grocery",
    destination: "N/A",
    deliveryFee: "$67.25",
  },
];

const statCards = [
  {
    title: "Total Parcels",
    value: "2,847",
    color: "bg-green-500",
  },
  {
    title: "In Transit",
    value: "127",
    color: "bg-blue-500",
  },
  {
    title: "Delivered Today",
    value: "234",
    color: "bg-green-500",
  },
  {
    title: "Pending Pickup",
    value: "45",
    color: "bg-orange-500",
  },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "in transit":
      return "default";
    case "pickup":
      return "secondary";
    case "delivered":
      return "default";
    default:
      return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "in transit":
      return "bg-secondary text-white";
    case "pickup":
      return "bg-secondary/80 text-white";
    default:
      return "";
  }
};

export default function AllParcels() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const columns: ColumnDef<(typeof parcelsData)[0]>[] = [
    {
      accessorKey: "id",
      header: "Tracking ID",
    },
    {
      accessorKey: "sender",
      header: "Sender",
    },
    {
      accessorKey: "recipient",
      header: "Recipient",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <Badge
          className={getStatusColor(String(getValue()))}
          variant={getStatusVariant(String(getValue()))}
        >
          {String(getValue())}
        </Badge>
      ),
    },
    {
      accessorKey: "parcelType",
      header: "Parcel Type",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "deliveryFee",
      header: "Delivery Fee",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="All Parcels"
        subtitle="Complete overview of all parcel deliveries"
      >
        <CreateParcelDialog>
          <Button>
            <CarIcon />
            Create Parcel Order
          </Button>
        </CreateParcelDialog>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 shadow-none"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:flex-1 border-0 shadow-none min-w-0">
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
              <SelectTrigger className="w-full sm:flex-1 border-0 shadow-none min-w-0">
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
              <SelectTrigger className="w-full sm:flex-1 border-0 shadow-none min-w-0">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="bg-gray-100">
                <Filter className="" />
                More Filters
              </Button>

              <Button className=" bg-green-500 hover:bg-green-600">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="">
            <DataTable columns={columns} data={parcelsData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
