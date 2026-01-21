import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import ProfileAvatar from "../ProfileAvatar";
import { cn } from "@/lib/utils";

type Customer = {
  id: string;
  name: string;
  email: string;
  accountType: string;
  orders: number;
  totalSpent: number;
  rating: number;
  status: "Active" | "Inactive" | "Blocked";
  lastOrder: string;
};

const CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Anderson",
    email: "john.anderson@example.com",
    accountType: "Premium",
    orders: 45,
    totalSpent: 4532.5,
    rating: 4.8,
    status: "Active",
    lastOrder: "2024-12-24",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    accountType: "Premium",
    orders: 67,
    totalSpent: 6789.25,
    rating: 4.9,
    status: "Active",
    lastOrder: "2024-12-23",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    accountType: "Standard",
    orders: 23,
    totalSpent: 2341.0,
    rating: 4.5,
    status: "Inactive",
    lastOrder: "2024-11-15",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    accountType: "Standard",
    orders: 12,
    totalSpent: 1245.5,
    rating: 3.2,
    status: "Blocked",
    lastOrder: "2024-10-20",
  },
];

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);
}

export default function CustomersTable({
  filter,
}: {
  filter?: "all" | "active" | "inactive" | "blocked";
}) {
  const rows = CUSTOMERS.filter((c) =>
    !filter || filter === "all"
      ? true
      : filter === "active"
        ? c.status === "Active"
        : filter === "inactive"
          ? c.status === "Inactive"
          : c.status === "Blocked",
  );

  const columns: ColumnDef<Customer>[] = [
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const r = row.original as Customer;
        return (
          <div className="flex items-center gap-3">
            <ProfileAvatar
              name={r.name}
              className="size-10"
              fallbackClassName="bg-emerald-50 text-emerald-500"
            />
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-muted-foreground">{r.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "accountType",
      header: "Account Type",
      cell: ({ getValue }) => {
        const type = getValue() as string;
        return (
          <Badge
            className="rounded-md"
            variant={type.toLowerCase() === "standard" ? "outline" : "default"}
          >
            {type}
          </Badge>
        );
      },
    },
    { accessorKey: "orders", header: "Orders" },
    {
      accessorKey: "totalSpent",
      header: "Total Spent",
      cell: ({ getValue }) => (
        <div className="text-emerald-600 font-medium">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Star className="size-4 text-amber-400 fill-amber-400" />
          <span>{getValue() as number}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const statusColors: Record<string, string> = {
          Active: "bg-green-500",
          Inactive: "bg-gray-500",
          Blocked: "bg-red-500",
        };
        const status = getValue() as string;
        return (
          <Badge className={cn("rounded-md", statusColors[status])}>
            {status}
          </Badge>
        );
      },
    },
    { accessorKey: "lastOrder", header: "Last Order" },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchPlaceholder="Search by ID, name, phone..."
    />
  );
}
