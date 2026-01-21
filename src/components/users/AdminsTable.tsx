import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import ProfileAvatar from "../ProfileAvatar";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  permissions: number;
  status: "Active" | "Inactive";
  lastLogin: string;
  twoFA: "enabled" | "disabled" | "warning";
};

const ADMINS: Admin[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@goparcel.com",
    role: "Super Admin",
    department: "Operations",
    permissions: 1,
    status: "Active",
    lastLogin: "2024-12-24 10:30 AM",
    twoFA: "enabled",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@goparcel.com",
    role: "Support Manager",
    department: "Customer Support",
    permissions: 3,
    status: "Active",
    lastLogin: "2024-12-24 09:15 AM",
    twoFA: "enabled",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@goparcel.com",
    role: "Operations Admin",
    department: "Operations",
    permissions: 4,
    status: "Active",
    lastLogin: "2024-12-23 04:30 PM",
    twoFA: "warning",
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "robert.wilson@goparcel.com",
    role: "Finance Admin",
    department: "Finance",
    permissions: 3,
    status: "Inactive",
    lastLogin: "2024-12-10 02:20 PM",
    twoFA: "enabled",
  },
  {
    id: "5",
    name: "Lisa Williams",
    email: "lisa.williams@goparcel.com",
    role: "Content Manager",
    department: "Marketing",
    permissions: 3,
    status: "Active",
    lastLogin: "2024-12-24 08:45 AM",
    twoFA: "enabled",
  },
];

export default function AdminsTable({
  filter,
}: {
  filter?: "all" | "active" | "inactive";
}) {
  const rows = ADMINS.filter((a) =>
    !filter || filter === "all"
      ? true
      : filter === "active"
        ? a.status === "Active"
        : a.status === "Inactive",
  );

  const columns: ColumnDef<Admin>[] = [
    {
      id: "admin",
      header: "Admin",
      cell: ({ row }) => {
        const r = row.original as Admin;
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
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => (
        <Badge variant="outline">{getValue() as string}</Badge>
      ),
    },
    { accessorKey: "department", header: "Department" },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ getValue }) => `${getValue()} permissions`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge
            className={cn("rounded-md", status !== "Active" && "bg-gray-500")}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ getValue }) => (
        <div className="text-sm text-muted-foreground">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "twoFA",
      header: "2FA",
      cell: ({ getValue }) =>
        getValue() === "enabled" ? (
          <Shield className="text-emerald-600" />
        ) : getValue() === "warning" ? (
          <AlertTriangle className="text-amber-500" />
        ) : (
          <span className="text-sm text-muted-foreground">Off</span>
        ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchPlaceholder="Search by ID, name, phone..."
    />
  );
}
