import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye } from "lucide-react";

const defaultApplications = [
  {
    id: "ONB-2001",
    name: "Alex Thompson",
    email: "alex.t@email.com",
    type: "Driver",
    service: "Ride Services",
    appliedDate: "1/10/2024",
    progress: 75,
    status: "Documents Submitted",
  },
  {
    id: "ONB-2002",
    name: "Maria Garcia",
    email: "maria.g@email.com",
    type: "Partner",
    service: "Parcel Delivery",
    appliedDate: "1/12/2024",
    progress: 90,
    status: "Background Check",
  },
  {
    id: "ONB-2003",
    name: "Kevin Brown",
    email: "kevin.b@email.com",
    type: "Driver",
    service: "Delivery Services",
    appliedDate: "1/8/2024",
    progress: 100,
    status: "Approved",
  },
  {
    id: "ONB-2004",
    name: "Linda Wilson",
    email: "linda.w@email.com",
    type: "Partner",
    service: "Moving Services",
    appliedDate: "1/14/2024",
    progress: 40,
    status: "Pending Review",
  },
];

type Props = {
  applications?: typeof defaultApplications;
};

const statusColors: Record<string, string> = {
  "Documents Submitted": "bg-sky-500",
  "Background Check": "bg-purple-500",
  Approved: "bg-green-500",
  "Pending Review": "bg-amber-500",
};

function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-green-500"
      : value >= 60
        ? "bg-teal-500"
        : "bg-emerald-400";
  return (
    <div className="w-36">
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{ width: `${value}%` }} />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{value}%</div>
    </div>
  );
}

export default function OnboardingTable({
  applications = defaultApplications,
}: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">All Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Application ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Applicant
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Applied Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Progress
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm align-top">{a.id}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {a.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="rounded">{a.type}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{a.service}</td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {a.appliedDate}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <ProgressBar value={a.progress} />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[a.status] || "bg-gray-500"}`}
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
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
