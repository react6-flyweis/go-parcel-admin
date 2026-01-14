import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  RefreshCw,
  Phone,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Delivery {
  id: string;
  recipient: string;
  address: string;
  driver: string;
  failureReason: string;
  attempts: number;
  lastAttempt: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: "ORD-2024-1150",
    recipient: "Jane Smith",
    address: "456 Oak Ave, NYC",
    driver: "Mike Johnson",
    failureReason: "Recipient Not Available",
    attempts: 2,
    lastAttempt: "2024-12-24 02:30 PM",
  },
  {
    id: "ORD-2024-1148",
    recipient: "Client Inc",
    address: "321 Corporate Dr",
    driver: "Sarah Wilson",
    failureReason: "Incorrect Address",
    attempts: 3,
    lastAttempt: "2024-12-24 01:15 PM",
  },
  {
    id: "ORD-2024-1142",
    recipient: "Customer",
    address: "789 Main St",
    driver: "Tom Lee",
    failureReason: "Access Denied",
    attempts: 1,
    lastAttempt: "2024-12-24 11:45 AM",
  },
];

export default function FailedDeliveries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = [
    { label: "Total Failed", value: "12", color: "bg-red-500" },
    { label: "Recipient Unavailable", value: "5", color: "bg-orange-400" },
    { label: "Address Issues", value: "4", color: "bg-yellow-400" },
    { label: "Other Reasons", value: "3", color: "bg-slate-400" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Failed Deliveries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and resolve failed delivery attempts
          </p>
        </div>

        <div>
          <Button className="bg-red-500 text-white hover:bg-red-600 gap-2">
            <AlertTriangle className="h-4 w-4" />
            Bulk Reassign
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

      {/* Resolution required alert */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="text-yellow-700! size-5!" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-yellow-800">
              Resolution Required
            </div>
            <div className="text-sm text-slate-600">
              Contact recipients or update delivery details to retry failed
              deliveries
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Data table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                    Tracking ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Recipient
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Failure Reason
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Attempts
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                    Last Attempt
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockDeliveries.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{d.id}</td>
                    <td className="px-4 py-3 text-sm">{d.recipient}</td>
                    <td className="px-4 py-3 text-sm">{d.address}</td>
                    <td className="px-4 py-3 text-sm">{d.driver}</td>
                    <td className="px-4 py-3 text-sm text-red-600">
                      {d.failureReason}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {d.attempts} {d.attempts > 1 ? "times" : "time"}
                    </td>
                    <td className="px-4 py-3 text-sm">{d.lastAttempt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3"
            >
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              Schedule Retry
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3"
            >
              <Phone className="h-5 w-5 text-muted-foreground" />
              Contact Recipient
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 flex-1 text-left flex items-center gap-3"
            >
              <MapPin className="h-5 w-5 text-muted-foreground" />
              Update Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
