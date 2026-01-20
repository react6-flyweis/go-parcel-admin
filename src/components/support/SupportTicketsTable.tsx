import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DataTable from "@/components/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupportTicket {
  id: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  assignedTo: {
    name: string;
    initials: string;
    avatar?: string;
  };
}

const ticketsData: SupportTicket[] = [
  {
    id: "#1001",
    subject: "Payment not received after...",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      initials: "JD",
    },
    category: "Billing",
    priority: "High",
    status: "Open",
    assignedTo: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: "",
    },
  },
  {
    id: "#1002",
    subject: "Driver was unprofessional",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      initials: "JS",
    },
    category: "Complaint",
    priority: "Medium",
    status: "In Progress",
    assignedTo: {
      name: "Mike Chen",
      initials: "MC",
      avatar: "",
    },
  },
  {
    id: "#1003",
    subject: "How to schedule recurring deliveries?",
    customer: {
      name: "Bob Johnson",
      email: "bob@example.com",
      initials: "BJ",
    },
    category: "General Inquiry",
    priority: "Low",
    status: "Resolved",
    assignedTo: {
      name: "Lisa Williams",
      initials: "LW",
      avatar: "",
    },
  },
  {
    id: "#1004",
    subject: "Parcel damaged during delivery",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      initials: "ED",
    },
    category: "Damage Claim",
    priority: "High",
    status: "Open",
    assignedTo: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: "",
    },
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
      return "bg-orange-500 hover:bg-orange-600";
    case "In Progress":
      return "bg-blue-500 hover:bg-blue-600";
    case "Resolved":
      return "bg-green-500 hover:bg-green-600";
    default:
      return "bg-gray-500";
  }
};

const columns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: "id",
    header: "Ticket",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.subject}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.id.replace("#", "ORD-2024-")}678
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 bg-blue-100">
          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
            {row.original.customer.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.customer.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.customer.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    accessorKey: "priority",
    header: () => (
      <div className="flex items-center gap-2">
        <span>Priority</span>
        <Select>
          <SelectTrigger className="h-7 w-[90px] border-0 shadow-none">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
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
    accessorKey: "assignedTo",
    header: () => (
      <div className="flex items-center gap-2">
        <span>Assigned To</span>
        <Select>
          <SelectTrigger className="h-7 w-[100px] border-0 shadow-none">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sarah">Sarah</SelectItem>
            <SelectItem value="mike">Mike</SelectItem>
            <SelectItem value="lisa">Lisa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-blue-600">
          <AvatarFallback className="text-xs bg-blue-600 text-white">
            {row.original.assignedTo.initials}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.assignedTo.name}</span>
      </div>
    ),
  },
];

interface SupportTicketsTableProps {
  filter?: string;
}

export default function SupportTicketsTable({
  filter,
}: SupportTicketsTableProps) {
  const filteredData = filter
    ? ticketsData.filter((ticket) => ticket.status === filter)
    : ticketsData;

  return (
    <DataTable columns={columns} data={filteredData} searchColumn="subject" />
  );
}
