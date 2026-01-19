// React import not required with the new JSX runtime
import { Eye, MapPin, User, Activity, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Row = {
  vehicle: string;
  driver: string;
  status: "Moving" | "Idle" | "Parked";
  location: string;
  speed: string;
  eta: string;
  fuel: number;
  model?: string;
  year?: number;
};

const rows: Row[] = [
  {
    vehicle: "MA-1234",
    driver: "Michael Johnson",
    status: "Moving",
    location: "Main St & 5th Ave, Boston",
    speed: "35 mph",
    eta: "15 min",
    fuel: 75,
    model: "Toyota Camry",
    year: 2022,
  },
  {
    vehicle: "MA-5678",
    driver: "Sarah Williams",
    status: "Idle",
    location: "Harvard Square, Cambridge",
    speed: "0 mph",
    eta: "5 min",
    fuel: 60,
    model: "Honda CR-V",
    year: 2023,
  },
  {
    vehicle: "MA-9012",
    driver: "David Martinez",
    status: "Moving",
    location: "Commonwealth Ave, Boston",
    speed: "45 mph",
    eta: "22 min",
    fuel: 40,
    model: "Ford Transit",
    year: 2021,
  },
  {
    vehicle: "MA-3456",
    driver: "Robert Chen",
    status: "Parked",
    location: "Fenway Park Lot, Boston",
    speed: "0 mph",
    eta: "N/A",
    fuel: 85,
    model: "Chevrolet Silverado",
    year: 2020,
  },
];
const statusColors: Record<string, string> = {
  Moving: "bg-green-500",
  Idle: "bg-amber-500",
  Parked: "bg-gray-500",
};

function StatusBadge({ status }: { status: Row["status"] }) {
  const Icon =
    status === "Moving" ? Activity : status === "Idle" ? Clock : MapPin;
  return (
    <Badge
      className={`rounded text-xs flex items-center gap-2 ${statusColors[status] || "bg-gray-500"}`}
    >
      <Icon className="h-4 w-4" />
      <span>{status}</span>
    </Badge>
  );
}

function FuelBar({ value }: { value: number }) {
  const color =
    value >= 75 ? "bg-green-500" : value >= 40 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="w-28">
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{ width: `${value}%` }} />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{value}%</div>
    </div>
  );
}

export default function LiveVehicleTrackingTable() {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Live Vehicle Tracking</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Plate Number
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
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Speed
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      ETA
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Fuel
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.vehicle} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-5 text-sm align-top font-medium">
                        {r.vehicle}
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="size-4" />
                          <div>
                            <div className="font-medium">{r.driver}</div>
                            <div className="text-xs text-muted-foreground">
                              {r.model} {r.year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-5 text-sm flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-slate-400" />{" "}
                        {r.location}
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <div className=" flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-500" /> {r.speed}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <div className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-slate-50">
                          {r.eta}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <FuelBar value={r.fuel} />
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" className="p-2">
                            <Eye className="h-4 w-4" />
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
