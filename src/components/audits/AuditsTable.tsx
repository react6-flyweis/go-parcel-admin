import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Audit = {
  id: string;
  auditType: string;
  auditedEntity: string;
  status: string;
  score: string | null;
  auditor: string;
  scheduledDate: string;
};

const data: Audit[] = [
  {
    id: "AUD-2024-1001",
    auditType: "Driver Safety Audit",
    auditedEntity: "Mike Johnson (Driver)",
    status: "Completed",
    score: "92%",
    auditor: "Admin User",
    scheduledDate: "2024-12-20",
  },
  {
    id: "AUD-2024-1002",
    auditType: "Partner Compliance Audit",
    auditedEntity: "Business Corp Inc (Partner)",
    status: "In Progress",
    score: null,
    auditor: "Compliance Team",
    scheduledDate: "2024-12-24",
  },
  {
    id: "AUD-2024-1003",
    auditType: "Vehicle Inspection",
    auditedEntity: "Toyota Camry - ABC123",
    status: "Failed",
    score: "58%",
    auditor: "Safety Inspector",
    scheduledDate: "2024-12-18",
  },
  {
    id: "AUD-2024-1004",
    auditType: "Background Check Review",
    auditedEntity: "Sarah Wilson (Driver)",
    status: "Scheduled",
    score: null,
    auditor: "HR Team",
    scheduledDate: "2024-12-26",
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    Completed: "bg-green-500",
    "In Progress": "bg-amber-400",
    Failed: "bg-red-500",
    Scheduled: "bg-blue-500",
  };

  const color = statusColors[status] ?? "bg-gray-200 text-gray-800";
  return <Badge className={cn("text-white rounded-lg", color)}>{status}</Badge>;
}

const columns: ColumnDef<Audit>[] = [
  { accessorKey: "id", header: "Audit ID" },
  { accessorKey: "auditType", header: "Audit Type" },
  { accessorKey: "auditedEntity", header: "Audited Entity" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ getValue }) =>
      getValue() ? (
        <span className="font-medium text-green-600">{String(getValue())}</span>
      ) : (
        "-"
      ),
  },
  { accessorKey: "auditor", header: "Auditor" },
  { accessorKey: "scheduledDate", header: "Scheduled Date" },
];

export default function AuditsTable() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
