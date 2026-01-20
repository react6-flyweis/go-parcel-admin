import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  id: string;
  dateTime: string;
  type: string;
  customer: string;
  driver: string;
  amount: string;
  paymentMethod: string;
  status: "completed" | "pending" | string;
};

const sampleData: Transaction[] = [
  {
    id: "TXN-2024-10001",
    dateTime: "2024-12-24 02:30 PM",
    type: "Ride Payment",
    customer: "John Doe",
    driver: "Mike Johnson",
    amount: "$28.50",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "TXN-2024-10002",
    dateTime: "2024-12-24 02:15 PM",
    type: "Parcel Delivery",
    customer: "Jane Smith",
    driver: "Sarah Wilson",
    amount: "$45.00",
    paymentMethod: "Wallet",
    status: "completed",
  },
  {
    id: "TXN-2024-10003",
    dateTime: "2024-12-24 01:45 PM",
    type: "Ride Payment",
    customer: "Bob Johnson",
    driver: "Tom Lee",
    amount: "$52.75",
    paymentMethod: "Cash",
    status: "pending",
  },
  {
    id: "TXN-2024-10004",
    dateTime: "2024-12-24 01:20 PM",
    type: "NEMT Service",
    customer: "Alice Brown",
    driver: "Emily Davis",
    amount: "$85.00",
    paymentMethod: "Insurance",
    status: "completed",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <Badge className="bg-green-500 text-white rounded-full px-3 py-1">
        Completed
      </Badge>
    );
  }

  if (status === "pending") {
    return (
      <Badge className="bg-amber-400 text-white rounded-full px-3 py-1">
        Pending Settlement
      </Badge>
    );
  }

  return <Badge>{status}</Badge>;
}

export default function TransactionsTable({
  data = sampleData,
}: {
  data?: Transaction[];
}) {
  const columns: ColumnDef<Transaction>[] = [
    { accessorKey: "id", header: "Transaction ID" },
    { accessorKey: "dateTime", header: "Date & Time" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="inline-block rounded-md border border-muted px-3 py-1 text-sm">
          {row.getValue("type")}
        </span>
      ),
    },
    { accessorKey: "customer", header: "Customer" },
    { accessorKey: "driver", header: "Driver/Partner" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-emerald-500 font-medium">
          {row.getValue("amount")}
        </span>
      ),
    },
    { accessorKey: "paymentMethod", header: "Payment Method" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={String(info.getValue())} />,
    },
  ];

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
