import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Edit } from "lucide-react";

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

type Props = {
  bookings?: typeof defaultBookings;
};

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-500",
  "In Progress": "bg-green-500",
  Completed: "bg-gray-500",
  Canceled: "bg-red-500",
};

export default function NEMTBookingsTable({
  bookings = defaultBookings,
}: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">NEMT Bookings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Booking ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Patient Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Appointment
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Vehicle Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Cost
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">{b.id}</td>
                      <td className="px-4 py-3 text-sm">{b.patient}</td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {b.appointment}
                      </td>
                      <td className="px-4 py-3 text-sm">{b.vehicle}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[b.status]}`}
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{b.driver}</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                        {"$" + b.cost.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" className="p-2">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" className="p-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
