import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import CreateParcelDialog from "@/components/parcels/CreateParcelDialog";
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

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">All Parcels</h1>
          <p className="text-muted-foreground">
            Complete overview of all parcel deliveries
          </p>
        </div>
        {/* Create Parcel Order dialog */}
        <div className="flex items-center">
          <CreateParcelDialog />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Data Table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                    Tracking ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Sender
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Recipient
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Parcel Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    Delivery Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcelsData.map((parcel) => (
                  <tr key={parcel.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{parcel.id}</td>
                    <td className="px-4 py-3 text-sm">{parcel.sender}</td>
                    <td className="px-4 py-3 text-sm">{parcel.recipient}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={getStatusColor(parcel.status)}
                        variant={getStatusVariant(parcel.status)}
                      >
                        {parcel.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{parcel.parcelType}</td>
                    <td className="px-4 py-3 text-sm">{parcel.destination}</td>
                    <td className="px-4 py-3 text-sm">{parcel.deliveryFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
