import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

type Refund = {
  id: string;
  orderId: string;
  customer: string;
  amount: string;
  reason: string;
  requestedBy: string;
  status: string;
  requestDate: string;
};

const sampleData: Refund[] = [
  {
    id: "REF-2024-3001",
    orderId: "ORD-2024-1180",
    customer: "John Doe",
    amount: "-$28.50",
    reason: "Service Not Delivered",
    requestedBy: "Customer",
    status: "Approved",
    requestDate: "2024-12-23",
  },
  {
    id: "REF-2024-3002",
    orderId: "ORD-2024-1165",
    customer: "Jane Smith",
    amount: "-$45.00",
    reason: "Overcharge",
    requestedBy: "Admin",
    status: "Pending Review",
    requestDate: "2024-12-24",
  },
  {
    id: "REF-2024-3003",
    orderId: "ORD-2024-1152",
    customer: "Bob Johnson",
    amount: "-$52.75",
    reason: "Driver Cancelled",
    requestedBy: "System",
    status: "Processing",
    requestDate: "2024-12-24",
  },
  {
    id: "REF-2024-3004",
    orderId: "ORD-2024-1145",
    customer: "Alice Brown",
    amount: "-$85.00",
    reason: "Duplicate Charge",
    requestedBy: "Customer",
    status: "Rejected",
    requestDate: "2024-12-22",
  },
];

function StatusBadge({ status }: { status: string }) {
  const badgeColors: Record<string, string> = {
    Approved: "bg-green-500",
    "Pending Review": "bg-amber-400",
    Processing: "bg-blue-500",
    Rejected: "bg-red-500",
  };

  const className = badgeColors[status] ?? "";
  return (
    <Badge className={cn("text-white rounded-lg", className)}>{status}</Badge>
  );
}

export default function RefundsTable({
  data = sampleData,
}: {
  data?: Refund[];
}) {
  const columns: ColumnDef<Refund>[] = [
    { accessorKey: "id", header: "Refund ID" },
    { accessorKey: "orderId", header: "Order ID" },
    { accessorKey: "customer", header: "Customer" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-red-600 font-medium">
          {row.getValue("amount")}
        </span>
      ),
    },
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "requestedBy", header: "Requested By" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={String(info.getValue())} />,
    },
    { accessorKey: "requestDate", header: "Request Date" },
  ];

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
