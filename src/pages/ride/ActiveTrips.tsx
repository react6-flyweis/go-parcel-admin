import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Filter,
  Download,
  Phone,
  MapPin,
  Map,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Trip {
  id: string;
  rider: string;
  riderPhone?: string;
  driver: string;
  vehicle?: string;
  status: string;
  currentLocation: string;
  eta: string;
}

const mockTrips: Trip[] = [
  {
    id: "RID-2024-5679",
    rider: "Tom Wilson",
    riderPhone: "+1-555-1002",
    driver: "Lisa Park",
    vehicle: "Toyota Camry",
    status: "Assigned",
    currentLocation: "456 Residential St, NYC",
    eta: "Est. 45 mins",
  },
  {
    id: "RID-2024-5680",
    rider: "Sara Miller",
    riderPhone: "+1-555-1010",
    driver: "Omar Ali",
    vehicle: "Honda Civic",
    status: "En Route",
    currentLocation: "12 Broadway Ave, NYC",
    eta: "Est. 12 mins",
  },
  {
    id: "RID-2024-5681",
    rider: "Carlos Ruiz",
    riderPhone: "+1-555-1022",
    driver: "Priya Singh",
    vehicle: "Nissan Altima",
    status: "In Progress",
    currentLocation: "789 Park Blvd, NYC",
    eta: "Est. 7 mins",
  },
];

export default function ActiveTrips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = [
    {
      label: "Active Trips",
      value: "23",
      color: "bg-blue-500",
      subtitle: "+5 from last hour",
    },
    {
      label: "En Route to Pickup",
      value: "8",
      color: "bg-orange-400",
      subtitle: "Avg ETA: 7 min",
    },
    {
      label: "In Progress",
      value: "15",
      color: "bg-green-500",
      subtitle: "Avg completion: 12 min",
    },
    {
      label: "Safety Alerts",
      value: "0",
      color: "bg-green-500",
      subtitle: "All clear",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Active Trips</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time monitoring of ongoing rides
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Track All
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            color={stat.color}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Alert */}
      <Alert className="border-green-200 bg-green-50 flex items-center">
        <div className="bg-green-300 flex justify-center items-center animate-pulse size-4 rounded-full mr-3">
          <div className="bg-green-500 animate-pulse size-2 rounded-full" />
        </div>
        <AlertDescription className="flex items-center justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold text-green-500">
              Live tracking active for all trips
            </span>
            <span className="text-gray-600 ">
              Auto-refresh every 30 seconds • Last updated: Just now
            </span>
          </div>
          <Button variant="outline" size="sm" className="ml-4">
            Pause Updates
          </Button>
        </AlertDescription>
      </Alert>

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

            <Select>
              <SelectTrigger className="flex-1 border-0 shadow-none">
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drivers</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
              </SelectContent>
            </Select>

            <Select>
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

      {/* Data table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                    Ride ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Rider
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Current Location
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    ETA
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTrips.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{t.id}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{t.rider}</div>
                      {t.riderPhone && (
                        <div className="text-xs text-muted-foreground">
                          {t.riderPhone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{t.driver}</div>
                      {t.vehicle && (
                        <div className="text-xs text-muted-foreground">
                          {t.vehicle}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{t.currentLocation}</td>
                    <td className="px-4 py-3 text-sm">{t.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/20">
        <CardContent>
          <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3 rounded-md px-4 py-3"
            >
              <Phone className="h-5 w-5 text-muted-foreground" />
              Call All Drivers
            </Button>

            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3 rounded-md px-4 py-3"
            >
              <Map className="h-5 w-5 text-muted-foreground" />
              View Map
            </Button>

            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3 rounded-md px-4 py-3"
            >
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              Send Alert
            </Button>

            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3 rounded-md px-4 py-3"
            >
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
              Bulk Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
