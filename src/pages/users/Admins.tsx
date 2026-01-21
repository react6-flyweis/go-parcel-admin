import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  User,
  Shield,
  Headphones,
  DollarSign,
  FileText,
} from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import AdminsTab from "@/components/users/AdminsTab";
import AddAdminDialog from "@/components/users/AddAdminDialog";
import { useState } from "react";

const statCards = [
  {
    title: "Total Admins",
    value: "4",
    icon: <User className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Active Now",
    value: "3",
    icon: <Headphones className="size-6 text-white" />,
    color: "bg-emerald-500",
  },
  {
    title: "Total Actions Today",
    value: "107",
    icon: <FileText className="size-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "2FA Enabled",
    value: "80%",
    icon: <Shield className="size-6 text-white" />,
    color: "bg-orange-500",
  },
];

const roles = [
  {
    name: "Super Admin",
    count: 1,
    icon: <Shield className="text-white" />,
    color: "bg-red-500",
  },
  {
    name: "Operations Admin",
    count: 1,
    icon: <User className="text-white" />,
    color: "bg-blue-500",
  },
  {
    name: "Support Manager",
    count: 1,
    icon: <Headphones className="text-white" />,
    color: "bg-green-500",
  },
  {
    name: "Finance Admin",
    count: 1,
    icon: <DollarSign className="text-white" />,
    color: "bg-violet-500",
  },
  {
    name: "Content Manager",
    count: 1,
    icon: <FileText className="text-white" />,
    color: "bg-orange-500",
  },
];

export default function Admins() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Users"
        subtitle="Manage admin accounts, roles, permissions, and access control"
        Icon={<User className="size-6" />}
        iconColor="bg-blue-600"
      >
        <>
          <Button
            className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
            onClick={() => setAddOpen(true)}
          >
            <PlusIcon />
            Add Admin User
          </Button>
          <AddAdminDialog open={addOpen} onOpenChange={setAddOpen} />
        </>
      </PageHeader>

      {/* Top stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* Roles Distribution */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Roles Distribution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((r) => (
            <div
              key={r.name}
              className="border rounded-lg p-4 flex flex-col items-start gap-3"
            >
              <div className="flex flex-col  gap-3">
                <div
                  className={`size-10 rounded-md flex items-center justify-center ${r.color}`}
                >
                  {r.icon}
                </div>
                <div className="text-2xl font-semibold">{r.count}</div>
              </div>
              <div className="text-sm text-muted-foreground">{r.name}</div>
            </div>
          ))}
        </div>
      </div>
      <AdminsTab />
    </div>
  );
}
