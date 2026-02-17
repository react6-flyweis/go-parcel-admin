import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Edit, Users } from "lucide-react";
import ViewShuttleRouteDialog from "@/components/services/ViewShuttleRouteDialog";
import EditShuttleRouteDialog from "@/components/services/EditShuttleRouteDialog";

const defaultRoutes = [
  {
    id: "SHU-4001",
    name: "Corporate Campus Shuttle",
    org: "Tech Corp Inc",
    schedule: "Mon-Fri 07:00 AM",
    capacity: 35,
    status: "Active",
    rate: 8500,
  },
  {
    id: "SHU-4002",
    name: "Hotel Airport Shuttle",
    org: "Grand Hotel Boston",
    schedule: "Daily Every 2 Hours",
    capacity: 12,
    status: "Active",
    rate: 12000,
  },
  {
    id: "SHU-4003",
    name: "University Shuttle",
    org: "Boston University",
    schedule: "Mon-Fri 08:00 AM - 10:00 PM",
    capacity: 50,
    status: "Scheduled",
    rate: 15000,
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500",
  Scheduled: "bg-blue-500",
  Inactive: "bg-gray-500",
};

type Props = {
  routes?: typeof defaultRoutes;
};

export default function ShuttleRoutesTable({ routes = defaultRoutes }: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Shuttle Routes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary text-white">
                <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                  Route ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Route Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Organization
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Schedule
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Capacity
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Monthly Rate
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{r.id}</td>
                  <td className="px-4 py-3 text-sm">{r.name}</td>
                  <td className="px-4 py-3 text-sm">{r.org}</td>
                  <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {r.schedule}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge className="rounded border border-gray-200 text-gray-800 bg-transparent flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {r.capacity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge
                      className={`rounded text-xs ${statusColors[r.status]}`}
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                    {"$" + r.rate.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <ViewShuttleRouteDialog route={r}>
                        <Button variant="ghost" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </ViewShuttleRouteDialog>

                      <EditShuttleRouteDialog route={r}>
                        <Button variant="ghost" className="p-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </EditShuttleRouteDialog>
                    </div>
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
