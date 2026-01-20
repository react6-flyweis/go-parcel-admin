import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Calendar, Eye, Edit } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import DataTableWithSearch from "../DataTableWithSearch";

const defaultBookings = [
  {
    id: "NEMT-1001",
    patient: "John Smith",
    appointment: "2024-01-15 09:00 AM",
    vehicle: "Wheelchair Van",
    status: "Scheduled",
    driver: "Robert Wilson",
    cost: 85.0,
  },
  {
    id: "NEMT-1002",
    patient: "Mary Johnson",
    appointment: "2024-01-15 10:30 AM",
    vehicle: "Ambulatory",
    status: "In Progress",
    driver: "James Brown",
    cost: 65.0,
  },
  {
    id: "NEMT-1003",
    patient: "David Lee",
    appointment: "2024-01-15 02:00 PM",
    vehicle: "Standard Sedan",
    status: "Scheduled",
    driver: "Michael Davis",
    cost: 45.0,
  },
];
const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-500",
  "In Progress": "bg-green-500",
  Completed: "bg-gray-500",
  Canceled: "bg-red-500",
};

type Booking = (typeof defaultBookings)[number];

type Props = {
  bookings?: Booking[];
};

const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "patient",
    header: "Patient Name",
  },
  {
    accessorKey: "appointment",
    header: "Appointment",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>{info.getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Badge
        className={`rounded text-xs ${statusColors[info.getValue() as string]}`}
      >
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: (info) => (
      <span className="text-green-600 font-semibold">
        {"$" + (info.getValue() as number).toFixed(2)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => console.log(row.original.id)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="p-2">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function NEMTBookingsTable({
  bookings = defaultBookings,
}: Props) {
  return (
    <DataTableWithSearch
      title="NEMT Bookings"
      columns={columns}
      data={bookings}
      searchColumn="patient"
    />
  );
}
