import CreateRoleDialog from "@/components/users/CreateRoleDialog";
import PageHeader from "@/components/PageHeader";
import RolesTab from "@/components/users/RolesTab";
import { Key, Users, Settings, Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const stats = [
  {
    title: "Total Roles",
    value: "5",
    subtitle: "Total Roles",
    linkText: "5 active roles",
    icon: Key,
    iconBg: "bg-green-500",
  },
  {
    title: "Active Users",
    value: "5",
    subtitle: "Active Users",
    linkText: "Across all roles",
    icon: Users,
    iconBg: "bg-green-500",
  },
  {
    title: "Modules",
    value: "17",
    subtitle: "Modules",
    linkText: "Permission modules",
    icon: Settings,
    iconBg: "bg-blue-500",
  },
  {
    title: "Permissions",
    value: "68",
    subtitle: "Permissions",
    linkText: "Total permissions",
    icon: Shield,
    iconBg: "bg-purple-500",
  },
];

export default function Permissions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Permissions & Roles"
        subtitle="Manage user roles, permissions, and access control across the system"
        Icon={<Key className="h-6 w-6" />}
        iconColor="bg-purple-600"
      >
        <>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus />
            Create New Role
          </Button>
          <CreateRoleDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
        </>
      </PageHeader>

      {/* Top stat cards (rendered by mapping `stats` array) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-md ${s.iconBg}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-6 text-3xl font-semibold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {s.subtitle}
              </div>
              <div className="mt-4">
                <a className="text-sm text-blue-600">{s.linkText}</a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <RolesTab />
      </div>
    </div>
  );
}
