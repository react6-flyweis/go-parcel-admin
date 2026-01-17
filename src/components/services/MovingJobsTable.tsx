import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Edit } from "lucide-react";

const defaultJobs = [
  {
    id: "MOV-3001",
    customer: "James Wilson",
    size: "3 Bedroom",
    date: "2024-01-20 08:00 AM",
    status: "Scheduled",
    crew: "Team Alpha (4 movers)",
    cost: 850.0,
  },
  {
    id: "MOV-3002",
    customer: "Emily Thompson",
    size: "2 Bedroom",
    date: "2024-01-18 09:00 AM",
    status: "In Progress",
    crew: "Team Beta (3 movers)",
    cost: 600.0,
  },
  {
    id: "MOV-3003",
    customer: "Robert Chen",
    size: "4 Bedroom",
    date: "2024-01-22 07:00 AM",
    status: "Scheduled",
    crew: "Team Alpha (4 movers)",
    cost: 1200.0,
  },
];

type Props = {
  jobs?: typeof defaultJobs;
};

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-500",
  "In Progress": "bg-green-500",
  Completed: "bg-gray-500",
  Canceled: "bg-red-500",
};

export default function MovingJobsTable({ jobs = defaultJobs }: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Moving Jobs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Job ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Move Size
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Move Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Crew
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Total Cost
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">{j.id}</td>
                      <td className="px-4 py-3 text-sm">{j.customer}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="rounded border border-gray-200 text-gray-800 bg-transparent">
                          {j.size}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {j.date}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[j.status]}`}
                        >
                          {j.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{j.crew}</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-semibold">
                        {"$" + j.cost.toFixed(2)}
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
