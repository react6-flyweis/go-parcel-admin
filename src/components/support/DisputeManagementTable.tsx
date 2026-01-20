import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DataTable from "@/components/DataTable";

interface Dispute {
  id: string;
  type: string;
  subject: string;
  refId: string;
  filedBy: {
    name: string;
    role: string;
    initials: string;
  };
  amount: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Under Review" | "Resolved";
  filedDate: string;
  filedTime: string;
}

const disputesData: Dispute[] = [
  {
    id: "#1001",
    type: "Refund Request",
    subject: "Item not delivered but charged",
    refId: "ORD-2024-7484",
    filedBy: {
      name: "John Anderson",
      role: "Customer",
      initials: "JA",
    },
    amount: "$145.00",
    priority: "High",
    status: "Open",
    filedDate: "2024-12-24",
    filedTime: "09:00 AM",
  },
  {
    id: "#1002",
    type: "Damage Claim",
    subject: "Package arrived damaged",
    refId: "ORD-2024-4591",
    filedBy: {
      name: "Emily Davis",
      role: "Customer",
      initials: "ED",
    },
    amount: "$89.50",
    priority: "Medium",
    status: "Under Review",
    filedDate: "2024-12-23",
    filedTime: "02:30 PM",
  },
  {
    id: "#1003",
    type: "Service Quality",
    subject: "Driver was unprofessional",
    refId: "RIDE-2024-8032",
    filedBy: {
      name: "Robert Smith",
      role: "Passenger",
      initials: "RS",
    },
    amount: "$45.00",
    priority: "Low",
    status: "Resolved",
    filedDate: "2024-12-22",
    filedTime: "11:00 AM",
  },
  {
    id: "#1004",
    type: "Overcharge",
    subject: "Incorrect fare calculation",
    refId: "RIDE-2024-9472",
    filedBy: {
      name: "Jane Williams",
      role: "Customer",
      initials: "JW",
    },
    amount: "$78.50",
    priority: "High",
    status: "Open",
    filedDate: "2024-12-24",
    filedTime: "03:15 PM",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500 hover:bg-red-600";
    case "Medium":
      return "bg-orange-500 hover:bg-orange-600";
    case "Low":
      return "bg-blue-500 hover:bg-blue-600";
    default:
      return "bg-gray-500";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-red-500 hover:bg-red-600";
    case "Under Review":
      return "bg-orange-500 hover:bg-orange-600";
    case "Resolved":
      return "bg-green-500 hover:bg-green-600";
    default:
      return "bg-gray-500";
  }
};

const columns: ColumnDef<Dispute>[] = [
  {
    accessorKey: "id",
    header: "Dispute ID",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="font-medium">{row.original.type}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.subject}</div>
        <div className="text-xs text-muted-foreground">
          Ref: {row.original.refId}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "filedBy",
    header: "Filed By",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 bg-green-100">
          <AvatarFallback className="text-xs bg-green-100 text-green-700">
            {row.original.filedBy.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.filedBy.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.filedBy.role}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-semibold">{row.original.amount}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge className={getPriorityColor(row.original.priority)}>
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "filedDate",
    header: "Filed Date",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.filedDate}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.filedTime}
        </div>
      </div>
    ),
  },
];

interface DisputeManagementTableProps {
  filter?: string;
}

export default function DisputeManagementTable({
  filter,
}: DisputeManagementTableProps) {
  const filteredData = filter
    ? disputesData.filter((dispute) => dispute.status === filter)
    : disputesData;

  return <DataTable columns={columns} data={filteredData} />;
}
