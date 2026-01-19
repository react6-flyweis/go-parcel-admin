import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const priorityColorMap: Record<string, string> = {
  Low: "bg-blue-500 text-white",
  Medium: "bg-amber-400 text-white",
  High: "bg-orange-500 text-white",
  Critical: "bg-red-600 text-white",
};

const statusColorMap: Record<string, string> = {
  Completed: "bg-green-500 text-white",
  "In Progress": "bg-violet-500 text-white",
  Scheduled: "bg-sky-500 text-white",
  Overdue: "bg-red-500 text-white",
};

export type MaintenanceRecord = {
  id: string;
  vehiclePlate: string;
  vehicleDesc: string;
  serviceType: string;
  scheduledDate: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: string;
  cost: number;
};

interface Props {
  records?: MaintenanceRecord[];
  onView?: (id: string) => void;
}

const defaultRecords: MaintenanceRecord[] = [
  {
    id: "MNT-1001",
    vehiclePlate: "MA-1234",
    vehicleDesc: "Toyota Camry 2022",
    serviceType: "Oil Change",
    scheduledDate: "1/15/2024",
    priority: "Medium",
    status: "Completed",
    cost: 85,
  },
  {
    id: "MNT-1002",
    vehiclePlate: "MA-9012",
    vehicleDesc: "Ford Transit 2021",
    serviceType: "Brake Inspection",
    scheduledDate: "1/20/2024",
    priority: "High",
    status: "In Progress",
    cost: 450,
  },
  {
    id: "MNT-1003",
    vehiclePlate: "MA-5678",
    vehicleDesc: "Honda CR-V 2023",
    serviceType: "Tire Rotation",
    scheduledDate: "1/25/2024",
    priority: "Low",
    status: "Scheduled",
    cost: 120,
  },
  {
    id: "MNT-1004",
    vehiclePlate: "MA-3456",
    vehicleDesc: "Chevrolet Silverado 2020",
    serviceType: "Engine Diagnostic",
    scheduledDate: "1/10/2024",
    priority: "Critical",
    status: "Overdue",
    cost: 350,
  },
];

// color mappings provided by src/lib/colorMap.ts

export default function MaintenanceRecordsTable({
  records = defaultRecords,
  onView,
}: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Maintenance Records</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary text-white">
                <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                  Service ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Service Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Scheduled Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
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
              {records.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-4 text-sm align-top">{r.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="font-medium">{r.vehiclePlate}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.vehicleDesc}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <Badge className="rounded bg-transparent border border-gray-200 text-gray-800">
                      {r.serviceType}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm">{r.scheduledDate}</td>
                  <td className="px-4 py-4 text-sm">
                    <Badge
                      className={`rounded ${priorityColorMap[r.priority] ?? "bg-gray-500 text-white"}`}
                    >
                      {r.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <Badge
                      className={`rounded ${statusColorMap[r.status] ?? "bg-gray-500 text-white"}`}
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-green-600 font-semibold">{`$${r.cost.toFixed(2)}`}</td>
                  <td className="px-4 py-4 text-sm">
                    <Button
                      variant="ghost"
                      className="p-2"
                      onClick={() => onView?.(r.id)}
                      aria-label={`View ${r.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
