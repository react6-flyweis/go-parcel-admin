import { useState } from "react";
import { Search, Filter, Download, Calendar } from "lucide-react";
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
    id: "RID-2024-5678",
    dateTime: "Dec 24, 2024 2:30 PM",
    rider: "Sarah Smith",
    driver: "Emily Davis",
    type: "On-Demand",
    status: "Completed",
    fare: "$28.00",
    distance: "8.5 km",
  },
  {
    id: "RID-2024-5679",
    dateTime: "Dec 24, 2024 3:05 PM",
    rider: "Mark Johnson",
    driver: "Liam Brown",
    type: "Scheduled",
    status: "Cancelled",
    fare: "$0.00",
    distance: "0 km",
  },
];

const statCards = [
  {
    title: "Total Completed",
    value: "1,156",
    subtitle: (
      <span className="text-xs text-green-500">+12.5% vs last month</span>
    ),
    color: "bg-green-500",
  },
  {
    title: "Total Revenue",
    value: "$45,680",
    subtitle: (
      <span className="text-xs text-green-500">+8.3% vs last month</span>
    ),
    color: "bg-green-500",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    subtitle: (
      <span className="text-xs text-green-500">+0.2 vs last month</span>
    ),
    color: "bg-yellow-400",
  },
  {
    title: "Cancellation Rate",
    value: "2.3%",
    subtitle: <span className="text-xs text-red-500">-0.5% vs last month</span>,
    color: "bg-red-400",
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
    case "completed":
      return "bg-green-500 text-white";
    case "cancelled":
      return "bg-red-500 text-white";
    default:
      return "";
  }
};

export default function RideHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Ride History</h1>
          <p className="text-muted-foreground">
            Complete history of all completed and cancelled rides
          </p>
        </div>
        {/* Create Parcel Order dialog */}
        <div className="flex items-center">
          <Button variant="ghost" className="mr-3 border">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Date Range
          </Button>

          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
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
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Progress Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <h3 className="text-sm font-medium mb-3">Peak Hours</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>8:00 AM - 10:00 AM</span>
                  <span className="text-muted-foreground">245 rides</span>
                </div>
                <div className="h-2 bg-gray-200 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>5:00 PM - 7:00 PM</span>
                  <span className="text-muted-foreground">312 rides</span>
                </div>
                <div className="h-2 bg-gray-200 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>12:00 PM - 2:00 PM</span>
                  <span className="text-muted-foreground">189 rides</span>
                </div>
                <div className="h-2 bg-gray-200 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-medium mb-3">Top Routes</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Airport ↔ Downtown</span>
                <span className="bg-gray-100 text-sm px-2 py-1 rounded">
                  156 trips
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mall ↔ Residential</span>
                <span className="bg-gray-100 text-sm px-2 py-1 rounded">
                  132 trips
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Station ↔ Business</span>
                <span className="bg-gray-100 text-sm px-2 py-1 rounded">
                  98 trips
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Hotel ↔ Convention</span>
                <span className="bg-gray-100 text-sm px-2 py-1 rounded">
                  67 trips
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-medium mb-3">Service Types</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>On-Demand</span>
                  <span className="text-muted-foreground">58%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: "58%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Airport Transfer</span>
                  <span className="text-muted-foreground">28%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scheduled</span>
                  <span className="text-muted-foreground">14%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-indigo-500 rounded"
                    style={{ width: "14%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <tr className="border-b bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                    Ride ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Rider
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Fare
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcelsData.map((parcel) => (
                  <tr key={parcel.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{parcel.id}</td>
                    <td className="px-4 py-3 text-sm">{parcel.dateTime}</td>
                    <td className="px-4 py-3 text-sm">{parcel.rider}</td>
                    <td className="px-4 py-3 text-sm">{parcel.driver}</td>
                    <td className="px-4 py-3 text-sm">{parcel.type}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={getStatusColor(parcel.status)}
                        variant={getStatusVariant(parcel.status)}
                      >
                        {parcel.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{parcel.fare}</td>
                    <td className="px-4 py-3 text-sm">{parcel.distance}</td>
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
