import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Edit } from "lucide-react";

const defaultAppointments = [
  {
    id: "NOT-2001",
    client: "Sarah Anderson",
    service: "Real Estate Closing",
    appointment: "2024-01-15 10:00 AM",
    status: "Scheduled",
    notary: "Jennifer White",
    fee: 150.0,
  },
  {
    id: "NOT-2002",
    client: "Michael Brown",
    service: "Legal Documents",
    appointment: "2024-01-15 02:00 PM",
    status: "In Progress",
    notary: "Robert Martinez",
    fee: 75.0,
  },
  {
    id: "NOT-2003",
    client: "Lisa Davis",
    service: "Business Documents",
    appointment: "2024-01-15 04:30 PM",
    status: "Scheduled",
    notary: "Amanda Lopez",
    fee: 200.0,
  },
];

type Props = {
  appointments?: typeof defaultAppointments;
};

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-500",
  "In Progress": "bg-green-500",
  Completed: "bg-gray-500",
  Canceled: "bg-red-500",
};

export default function NotaryAppointmentsTable({
  appointments = defaultAppointments,
}: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Notary Appointments</CardTitle>
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
                      Client Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Service Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Appointment
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Notary
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Fee
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">{a.id}</td>
                      <td className="px-4 py-3 text-sm">{a.client}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="rounded text-sm py-1 px-2 border-gray-300 border! text-gray-800 bg-transparent">
                          {a.service}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {a.appointment}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[a.status]}`}
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{a.notary}</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                        {"$" + a.fee.toFixed(2)}
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
