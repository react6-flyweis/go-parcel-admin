import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Calendar, Eye, Edit } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import DataTableWithSearch from "../DataTableWithSearch";
import EditNemtBookingDialog from "./EditNemtBookingDialog";
import ViewNemtBookingDialog from "./ViewNemtBookingDialog";

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
    cell: ({ row }) => {
      const appt = String(row.original.appointment ?? "");
      const match = appt.match(
        /^(\d{4}-\d{2}-\d{2})\s+(\d{1,2}:\d{2})\s*(AM|PM)?/i,
      );
      const appointmentDate = match ? match[1] : "";
      let appointmentTime = "";
      if (match) {
        const hhmm = match[2];
        const ampm = match[3];
        if (ampm) {
          let [h, m] = hhmm.split(":").map(Number);
          if (/^pm$/i.test(ampm) && h !== 12) h += 12;
          if (/^am$/i.test(ampm) && h === 12) h = 0;
          appointmentTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        } else {
          appointmentTime = hhmm;
        }
      }

      const editBooking = {
        patientName: row.original.patient,
        patientPhone: "",
        pickupAddress: "",
        dropoffAddress: "",
        appointmentDate,
        appointmentTime,
        vehicleType: row.original.vehicle,
        insuranceProvider: "",
        specialRequirements: "",
        wheelchairAccessible: false,
        oxygenRequired: false,
      };

      return (
        <div className="flex items-center gap-2">
          <ViewNemtBookingDialog booking={row.original}>
            <Button variant="ghost" className="p-2">
              <Eye className="h-4 w-4" />
            </Button>
          </ViewNemtBookingDialog>

          <EditNemtBookingDialog booking={editBooking}>
            <Button variant="ghost" className="p-2">
              <Edit className="h-4 w-4" />
            </Button>
          </EditNemtBookingDialog>
        </div>
      );
    },
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
