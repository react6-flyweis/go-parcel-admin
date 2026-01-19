import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Navigation, StarIcon } from "lucide-react";

const performance = [
  {
    id: "DRV-1001",
    name: "Michael Johnson",
    initials: "MJ",
    role: "Driver",
    trips: 1220,
    rating: 4.9,
    onTime: 96,
    satisfaction: 98,
    earnings: 45600,
  },
  {
    id: "PTR-5001",
    name: "Express Delivery LLC",
    initials: "ED",
    role: "Partner",
    trips: 2290,
    rating: 4.8,
    onTime: 94,
    satisfaction: 95,
    earnings: 89500,
  },
  {
    id: "DRV-1002",
    name: "Sarah Williams",
    initials: "SW",
    role: "Driver",
    trips: 870,
    rating: 4.7,
    onTime: 92,
    satisfaction: 94,
    earnings: 38900,
  },
  {
    id: "PTR-5002",
    name: "Metro Transportation",
    initials: "MT",
    role: "Partner",
    trips: 1520,
    rating: 4.6,
    onTime: 89,
    satisfaction: 91,
    earnings: 67800,
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

export default function PerformanceLeaderboadTable() {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Performance Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Completed
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      On-Time %
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Satisfaction
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Badge
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Revenue
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map((d) => (
                    <tr key={d.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm align-top">{d.id}</td>

                      <td className="px-4 py-3 text-sm flex items-center gap-4">
                        <Avatar initials={d.initials} />
                        <div>
                          <div className="font-medium">{d.name}</div>
                          <div className="mt-1">
                            <Badge className="rounded text-xs border border-gray-200 bg-transparent text-muted-foreground">
                              {d.role}
                            </Badge>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className=" text-sm flex items-center gap-2">
                          <StarIcon className="size-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm">{d.rating ?? "N/A"}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Navigation className="h-4 w-4" />
                        {d.trips}
                      </td>

                      <td className="px-4 py-3 text-sm w-40">
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${d.onTime}%` }}
                          />
                        </div>
                        <div className="text-xs mt-1">{d.onTime}%</div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className="text-sm text-blue-600">
                          {d.satisfaction}%
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {(() => {
                          const tier =
                            d.earnings > 80000
                              ? "Platinum"
                              : d.earnings > 50000
                                ? "Gold"
                                : d.earnings > 30000
                                  ? "Silver"
                                  : "Bronze";
                          const color =
                            tier === "Platinum"
                              ? "bg-violet-500"
                              : tier === "Gold"
                                ? "bg-yellow-400"
                                : tier === "Silver"
                                  ? "bg-gray-400"
                                  : "bg-amber-400";
                          return (
                            <Badge
                              className={`rounded ${color} text-white px-3`}
                            >
                              {tier}
                            </Badge>
                          );
                        })()}
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
