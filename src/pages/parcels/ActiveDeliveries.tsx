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
import { Alert, AlertDescription } from "@/components/ui/alert";
import AssignDriverDialog from "@/components/parcels/AssignDriverDialog";
import {
  Search,
  Filter,
  Download,
  MapPin,
  Truck,
  AlertCircle,
} from "lucide-react";

interface Delivery {
  id: string;
  driver: string;
  destination: string;
  status: "in-transit" | "out-for-delivery" | "picked-up" | "delayed";
  eta: string;
  distance: string;
  fee: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: "ORD-2024-1234",
    driver: "Mike Johnson",
    destination: "456 Oak Ave, NYC",
    status: "in-transit",
    eta: "15 mins",
    distance: "2.3 km",
    fee: "$45.50",
  },
  {
    id: "ORD-2024-1236",
    driver: "Sarah Wilson",
    destination: "321 Corporate Dr",
    status: "out-for-delivery",
    eta: "8 mins",
    distance: "1.1 km",
    fee: "$78.00",
  },
];

const statusConfig = {
  "in-transit": {
    label: "In Transit",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  "picked-up": {
    label: "Picked Up",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  delayed: {
    label: "Delayed",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export default function ActiveDeliveries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [driverFilter, setDriverFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const stats = [
    { label: "Active Now", value: "127", color: "bg-blue-500" },
    { label: "Out for Delivery", value: "45", color: "bg-orange-500" },
    { label: "Picked Up", value: "82", color: "bg-blue-500" },
    { label: "Delayed", value: "3", color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Active Deliveries
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of ongoing deliveries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MapPin className="h-4 w-4" />
            View on Map
          </Button>
          <AssignDriverDialog>
            <Button className="bg-secondary">
              <Truck className="h-4 w-4" />
              Assign Driver
            </Button>
          </AssignDriverDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="out-for-delivery">
                  Out for Delivery
                </SelectItem>
                <SelectItem value="picked-up">Picked Up</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={driverFilter} onValueChange={setDriverFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drivers</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
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

      {/* Alert */}
      <Alert className="border-red-200 bg-red-50 flex items-center">
        <AlertCircle className="text-red-700! size-5!" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold text-red-700">
              3 Deliveries Delayed
            </span>
            <span className="text-gray-600 ">
              Review and take action on delayed parcels
            </span>
          </div>
          <Button variant="outline" size="sm" className="ml-4">
            View Delayed
          </Button>
        </AlertDescription>
      </Alert>

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
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    ETA
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Distance
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">
                      {delivery.id}
                    </td>
                    <td className="px-4 py-3 text-sm">{delivery.driver}</td>
                    <td className="px-4 py-3 text-sm">
                      {delivery.destination}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={statusConfig[delivery.status].className}
                      >
                        {statusConfig[delivery.status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">
                      {delivery.eta}
                    </td>
                    <td className="px-4 py-3 text-sm">{delivery.distance}</td>
                    <td className="px-4 py-3 text-sm font-semibold">
                      {delivery.fee}
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
