import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Edit, User, GaugeIcon } from "lucide-react";

const defaultVehicles = [
  {
    plate: "MA-1234",
    name: "Toyota Camry",
    year: 2022,
    type: "Sedan",
    driver: "Michael Johnson",
    mileage: 45200,
    fuel: 75,
    status: "Active",
    nextService: "4/5/2024",
  },
  {
    plate: "MA-5678",
    name: "Honda CR-V",
    year: 2023,
    type: "SUV",
    driver: "Sarah Williams",
    mileage: 28900,
    fuel: 60,
    status: "Active",
    nextService: "4/15/2024",
  },
  {
    plate: "MA-9012",
    name: "Ford Transit",
    year: 2021,
    type: "Van",
    driver: "David Martinez",
    mileage: 67800,
    fuel: 40,
    status: "Maintenance",
    nextService: "2/20/2024",
  },
  {
    plate: "MA-3456",
    name: "Chevrolet Silverado",
    year: 2020,
    type: "Truck",
    driver: "Robert Chen",
    mileage: 89500,
    fuel: 85,
    status: "Active",
    nextService: "3/28/2024",
  },
];

type Props = {
  vehicles?: typeof defaultVehicles;
};

const statusColors: Record<string, string> = {
  Active: "bg-green-500",
  Maintenance: "bg-amber-500",
  Inactive: "bg-gray-500",
};

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

export default function AllVehiclesTable({
  vehicles = defaultVehicles,
}: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">All Vehicles</CardTitle>
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
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Assigned Driver
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Mileage
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Fuel
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Next Service
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.plate} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-5 text-sm align-top">{v.plate}</td>
                      <td className="px-4 py-5 text-sm">
                        <div className="font-medium">{v.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {v.year} • {v.type}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm flex items-center gap-2 text-muted-foreground">
                        <User className="size-4" />
                        {v.driver}
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <div className="flex items-center gap-2">
                          <GaugeIcon className="size-4 text-muted-foreground" />
                          <div className="text-sm">
                            {v.mileage.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            mi
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <FuelBar value={v.fuel} />
                      </td>
                      <td className="px-4 py-5 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[v.status] || "bg-gray-500"}`}
                        >
                          {v.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-5 text-sm flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {v.nextService}
                      </td>
                      <td className="px-4 py-5 text-sm">
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
