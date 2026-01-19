import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Package, Star as StarIcon } from "lucide-react";

const defaultPartners = [
  {
    id: "PTR-5001",
    business: "Express Delivery Services LLC",
    contact: "John Smith",
    service: "Parcel Delivery",
    jobs: 1234,
    rating: 4.8,
    status: "Active",
    revenue: 45600,
  },
  {
    id: "PTR-5002",
    business: "Metro Transportation Co",
    contact: "Sarah Johnson",
    service: "Ride Services",
    jobs: 892,
    rating: 4.9,
    status: "Active",
    revenue: 67800,
  },
  {
    id: "PTR-5003",
    business: "Quick Move Logistics",
    contact: "Michael Brown",
    service: "Moving Services",
    jobs: 0,
    rating: null,
    status: "Pending",
    revenue: 0,
  },
];

type Props = {
  partners?: typeof defaultPartners;
};

const statusColors: Record<string, string> = {
  Active: "bg-green-500",
  Pending: "bg-amber-500",
  Suspended: "bg-red-500",
};

export default function PartnersTable({ partners = defaultPartners }: Props) {
  return (
    <Card className="pb-0">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">All Partners</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium rounded-tl-lg">
                      Partner ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Business Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Contact Person
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Service Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Jobs
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
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
                  {partners.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm align-top">{p.id}</td>
                      <td className="px-4 py-3 text-sm">{p.business}</td>
                      <td className="px-4 py-3 text-sm">{p.contact}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="rounded">{p.service}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        {p.jobs}
                      </td>
                      <td className="px-4 py-3 text-sm ">
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">
                            {p.rating !== null ? p.rating : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge
                          className={`rounded text-xs ${statusColors[p.status] || "bg-gray-500"}`}
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-green-600 font-semibold">{`$${p.revenue.toLocaleString()}`}</td>
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
