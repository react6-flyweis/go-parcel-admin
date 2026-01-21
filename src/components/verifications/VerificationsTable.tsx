import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Verification = {
  id: string;
  type: string;
  subject: string;
  documentType: string;
  status: string;
  submitted: string;
  expiry: string | null;
};

const data: Verification[] = [
  {
    id: "VER-2024-1001",
    type: "Driver",
    subject: "Mike Johnson",
    documentType: "Driver License",
    status: "Pending Review",
    submitted: "2024-12-24",
    expiry: "2026-08-15",
  },
  {
    id: "VER-2024-1002",
    type: "Partner",
    subject: "Business Corp Inc",
    documentType: "Business License",
    status: "Approved",
    submitted: "2024-12-23",
    expiry: "2025-12-31",
  },
  {
    id: "VER-2024-1003",
    type: "Driver",
    subject: "Sarah Wilson",
    documentType: "Background Check",
    status: "Rejected",
    submitted: "2024-12-22",
    expiry: null,
  },
  {
    id: "VER-2024-1004",
    type: "Vehicle",
    subject: "Toyota Camry - ABC123",
    documentType: "Insurance",
    status: "Pending Review",
    submitted: "2024-12-24",
    expiry: "2025-06-30",
  },
];

function StatusBadge({ status }: { status: string }) {
  const badgeColors: Record<string, string> = {
    Approved: "bg-green-500",
    "Pending Review": "bg-amber-400",
    Rejected: "bg-red-500",
    "Expiring Soon": "bg-orange-400",
  };

  const colorClass = badgeColors[status] ?? "bg-gray-200 text-gray-800";

  return (
    <Badge className={cn("text-white rounded-md", colorClass)}>{status}</Badge>
  );
}

const columns: ColumnDef<Verification>[] = [
  { accessorKey: "id", header: "Verification ID" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "subject", header: "Subject Name" },
  { accessorKey: "documentType", header: "Document Type" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
  },
  { accessorKey: "submitted", header: "Submitted" },
  {
    accessorKey: "expiry",
    header: "Expiry Date",
    cell: ({ getValue }) => (getValue() ? String(getValue()) : "-"),
  },
];

export default function VerificationsTable() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
