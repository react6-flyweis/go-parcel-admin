import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Navigation, StarIcon } from "lucide-react";

const drivers = [
  {
    id: "DRV-1001",
    name: "Michael Johnson",
    initials: "MJ",
    vehicleType: "Sedan",
    plate: "MA-1234",
    service: "Ride & Delivery",
    trips: 1245,
    rating: 4.9,
    status: "Active",
    earnings: 45600,
  },
  {
    id: "DRV-1002",
    name: "Sarah Williams",
    initials: "SW",
    vehicleType: "SUV",
    plate: "MA-5678",
    service: "Ride",
    trips: 892,
    rating: 4.8,
    status: "On Trip",
    earnings: 38900,
  },
  {
    id: "DRV-1003",
    name: "David Martinez",
    initials: "DM",
    vehicleType: "Van",
    plate: "MA-9012",
    service: "Delivery",
    trips: 567,
    rating: 4.7,
    status: "Active",
    earnings: 28400,
  },
  {
    id: "DRV-1004",
    name: "Jennifer Lopez",
    initials: "JL",
    vehicleType: "Sedan",
    plate: "MA-3456",
    service: "Ride",
    trips: 423,
    rating: 4.6,
    status: "Offline",
    earnings: 19800,
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500",
  "On Trip": "bg-sky-500",
  Offline: "bg-gray-500",
};

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

export default function DriversTable() {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">All Drivers</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Driver ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Driver Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Service Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Trips
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Earnings
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((d) => (
                    <tr key={d.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm align-top">{d.id}</td>

                      <td className="px-4 py-3 text-sm flex items-center gap-4">
                        <Avatar initials={d.initials} />
                        <div>{d.name}</div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium">{d.vehicleType}</div>
                        <div className="text-xs text-muted-foreground">
                          {d.plate}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <Badge className="rounded">{d.service}</Badge>
                      </td>

                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Navigation className="h-4 w-4" />
                        {d.trips}
                      </td>

                      <td className="px-4 py-3">
                        <div className=" text-sm flex items-center gap-2">
                          <StarIcon className="size-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm">{d.rating ?? "N/A"}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[d.status] || "bg-gray-500"}`}
                        >
                          {d.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-3 text-sm text-green-600 font-semibold">{`$${d.earnings.toLocaleString()}`}</td>

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
