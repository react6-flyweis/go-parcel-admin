import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// using plain table markup to match AllParcels table styles
import StatCard from "@/components/ui/stat-card";
import ScheduleDeliveryDialog from "@/components/parcels/ScheduleDeliveryDialog";

import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Repeat1Icon,
  AlertCircleIcon,
} from "lucide-react";

interface Scheduled {
  id: string;
  scheduledDate: string;
  timeSlot: string;
  deliveryType: string;
  sender: string;
  receiver: string;
  recurrence: string;
}

const mockScheduled: Scheduled[] = [
  {
    id: "SP-1001",
    scheduledDate: "1/15/2024",
    timeSlot: "09:00 AM - 11:00 AM",
    deliveryType: "Same-Day Delivery",
    sender: "Tech Solutions Inc.",
    receiver: "John Anderson",
    recurrence: "One-time",
  },
  {
    id: "SP-1002",
    scheduledDate: "1/15/2024",
    timeSlot: "02:00 PM - 04:00 PM",
    deliveryType: "Grocery Delivery",
    sender: "FreshMart Downtown",
    receiver: "Sarah Williams",
    recurrence: "Weekly (Every Monday)",
  },
  {
    id: "SP-1003",
    scheduledDate: "1/16/2024",
    timeSlot: "10:00 AM - 12:00 PM",
    deliveryType: "Express Delivery",
    sender: "Medical Labs Co.",
    receiver: "Dr. James Chen",
    recurrence: "Daily (Mon-Fri)",
  },
];

const recurrenceBadge = (rec: string) => {
  if (rec.includes("One-time")) return "bg-blue-100 text-blue-700";
  if (rec.includes("Weekly")) return "bg-green-100 text-green-700";
  if (rec.includes("Daily")) return "bg-indigo-100 text-indigo-700";
  return "bg-gray-100 text-gray-700";
};

export default function ScheduledDeliveries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<string>("all");
  const [recurrenceFilter, setRecurrenceFilter] = useState<string>("all");
  const [confirmationFilter, setConfirmationFilter] = useState<string>("all");

  const stats = [
    {
      label: "Total Scheduled",
      value: "47",
      color: "bg-green-500",
      icon: Calendar,
    },
    {
      label: "Today's Scheduled",
      value: "12",
      color: "bg-blue-500",
      icon: Clock,
    },
    {
      label: "Recurring Orders",
      value: "23",
      color: "bg-indigo-500",
      icon: Repeat1Icon,
    },
    {
      label: "Pending Confirmation",
      value: "8",
      color: "bg-yellow-500",
      icon: AlertCircleIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Scheduled Parcels
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage scheduled deliveries and recurring orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent rounded">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
          <ScheduleDeliveryDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={stat.label}
              title={stat.label}
              value={stat.value}
              color={stat.color}
              icon={<Icon className="h-6 w-6 text-white" />}
            />
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="rounded-md">
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

            <Select
              value={recurrenceFilter}
              onValueChange={setRecurrenceFilter}
            >
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Recurrence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Recurrence</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={confirmationFilter}
              onValueChange={setConfirmationFilter}
            >
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Confirmation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Confirmation</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
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
                    Scheduled ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Scheduled Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Time Slot
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Delivery Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Sender
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Receiver
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    Recurrence
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockScheduled.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{row.id}</td>
                    <td className="px-4 py-3 text-sm flex items-center gap-1">
                      <Calendar className="size-4 text-green-500" />
                      {row.scheduledDate}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className=" flex items-center gap-1">
                        <Clock className="size-4 text-blue-500" />
                        {row.timeSlot}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{row.deliveryType}</td>
                    <td className="px-4 py-3 text-sm">{row.sender}</td>
                    <td className="px-4 py-3 text-sm">{row.receiver}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={recurrenceBadge(row.recurrence)}>
                        {row.recurrence}
                      </Badge>
                    </td>
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
