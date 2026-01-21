import React from "react";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Incident = {
  id: string;
  type: string;
  severity: string;
  status: string;
  reportedBy: string;
  reportedDate: string;
  relatedOrder: string;
};

const data: Incident[] = [
  {
    id: "INC-2024-1001",
    type: "Accident",
    severity: "High",
    status: "Under Investigation",
    reportedBy: "Driver - Mike Johnson",
    reportedDate: "2024-12-24 02:30 PM",
    relatedOrder: "ORD-2024-1234",
  },
  {
    id: "INC-2024-1002",
    type: "Customer Complaint",
    severity: "Medium",
    status: "Resolved",
    reportedBy: "Customer - John Smith",
    reportedDate: "2024-12-23 11:15 AM",
    relatedOrder: "ORD-2024-1198",
  },
  {
    id: "INC-2024-1003",
    type: "Safety Violation",
    severity: "High",
    status: "Action Taken",
    reportedBy: "System Auto-Report",
    reportedDate: "2024-12-22 09:45 PM",
    relatedOrder: "ORD-2024-1156",
  },
  {
    id: "INC-2024-1004",
    type: "Lost Item",
    severity: "Low",
    status: "Open",
    reportedBy: "Customer - Emily Davis",
    reportedDate: "2024-12-24 10:00 AM",
    relatedOrder: "ORD-2024-1245",
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    "Under Investigation": "bg-violet-500",
    Resolved: "bg-green-500",
    "Action Taken": "bg-emerald-500",
    Open: "bg-blue-500",
  };

  const color = statusColors[status] ?? "bg-gray-200 text-gray-800";
  return <Badge className={cn("text-white rounded-lg", color)}>{status}</Badge>;
}

function SeverityBadge({ severity }: { severity: string }) {
  const severityColors: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-amber-400",
    Low: "bg-yellow-400",
  };

  const color = severityColors[severity] ?? "bg-gray-200 text-gray-800";
  return (
    <Badge className={cn("text-white rounded-lg", color)}>{severity}</Badge>
  );
}

const columns: ColumnDef<Incident>[] = [
  { accessorKey: "id", header: "Incident ID" },
  { accessorKey: "type", header: "Type" },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ getValue }) => <SeverityBadge severity={String(getValue())} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
  },
  { accessorKey: "reportedBy", header: "Reported By" },
  { accessorKey: "reportedDate", header: "Reported Date" },
  { accessorKey: "relatedOrder", header: "Related Order" },
];

export default function IncidentsTable() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
