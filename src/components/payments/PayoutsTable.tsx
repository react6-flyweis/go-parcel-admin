import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

type Payout = {
  id: string;
  recipient: string;
  type: string;
  amount: string;
  period: string;
  status: string;
  scheduledDate: string;
};

const sampleData: Payout[] = [
  {
    id: "PAY-2024-5001",
    recipient: "Mike Johnson",
    type: "Driver",
    amount: "$1250.00",
    period: "Dec 17 - Dec 23, 2024",
    status: "Pending",
    scheduledDate: "2024-12-25",
  },
  {
    id: "PAY-2024-5002",
    recipient: "Business Corp Inc",
    type: "Partner",
    amount: "$3200.00",
    period: "Dec 17 - Dec 23, 2024",
    status: "Processed",
    scheduledDate: "2024-12-24",
  },
  {
    id: "PAY-2024-5003",
    recipient: "Sarah Wilson",
    type: "Driver",
    amount: "$980.50",
    period: "Dec 17 - Dec 23, 2024",
    status: "Pending",
    scheduledDate: "2024-12-25",
  },
  {
    id: "PAY-2024-5004",
    recipient: "Tom Lee",
    type: "Driver",
    amount: "$0.00",
    period: "Dec 17 - Dec 23, 2024",
    status: "On Hold",
    scheduledDate: "2024-12-26",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Processed") {
    return (
      <Badge className="bg-green-500 text-white rounded-full px-3 py-1">
        Processed
      </Badge>
    );
  }

  if (status === "Pending") {
    return (
      <Badge className="bg-amber-400 text-black rounded-full px-3 py-1">
        Pending
      </Badge>
    );
  }

  if (status === "On Hold") {
    return (
      <Badge className="bg-red-500 text-white rounded-full px-3 py-1">
        On Hold
      </Badge>
    );
  }

  return <Badge>{status}</Badge>;
}

export default function PayoutsTable({
  data = sampleData,
}: {
  data?: Payout[];
}) {
  const columns: ColumnDef<Payout>[] = [
    { accessorKey: "id", header: "Payout ID" },
    { accessorKey: "recipient", header: "Recipient" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="inline-block rounded-md border border-muted px-3 py-1 text-sm">
          {row.getValue("type")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Payout Amount",
      cell: ({ row }) => (
        <span className="text-emerald-500 font-medium">
          {row.getValue("amount")}
        </span>
      ),
    },
    { accessorKey: "period", header: "Period" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={String(info.getValue())} />,
    },
    { accessorKey: "scheduledDate", header: "Scheduled Date" },
  ];

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
