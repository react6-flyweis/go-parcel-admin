import React from "react";
import { Eye, Plus, Edit, Trash, Shield, XCircle } from "lucide-react";

type Role = {
  title: string;
  description: string;
  color: string;
  users: number;
  modules: number;
  counts: { view: number; create: number; edit: number; delete: number };
};

function PermissionBadge({
  enabled,
  color,
  title,
  children,
}: {
  enabled: boolean;
  color: "blue" | "green" | "orange" | "red";
  title?: string;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center size-7 rounded-md text-xs font-medium";
  if (!enabled) {
    return (
      <span
        title={title}
        className={`${base} border border-muted-foreground/20 text-muted-foreground`}
      >
        {children}
      </span>
    );
  }

  const map: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <span title={title} className={`${base} ${map[color]}`}>
      {children}
    </span>
  );
}

export default function PermissionMatrix({ roles }: { roles: Role[] }) {
  const modules = [
    "Dashboard",
    "User Management",
    "Admin Users",
    "Customers",
    "Parcel Delivery",
    "Ride Booking",
    "Specialized Services",
    "Drivers",
    "Partners",
    "Fleet Management",
    "Support & Tickets",
    "Disputes",
    "FAQ Management",
    "Analytics",
    "Reports",
    "Billing & Payments",
    "System Settings",
  ];

  const generatePermissions = (
    roleIndex: number,
    moduleIndex: number,
    role: Role,
  ) => {
    if (role.title === "Super Admin") {
      return { view: true, create: true, edit: true, delete: true };
    }

    const view = moduleIndex % 2 === 0 || role.counts.view > 8;
    const create =
      role.counts.create > 0 && (moduleIndex + roleIndex) % 3 === 0;
    const edit = role.counts.edit > 0 && (moduleIndex + roleIndex) % 4 === 0;
    const del = role.counts.delete > 0 && (moduleIndex + roleIndex) % 5 === 0;
    return { view, create, edit, delete: del };
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full divide-y table-auto">
          <thead>
            <tr className="bg-muted-foreground/5 text-sm text-muted-foreground">
              <th className="text-left p-3">Module</th>
              {roles.map((r) => (
                <th key={r.title} className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`shrink-0 h-7 w-7 rounded-md flex items-center justify-center ${r.color}`}
                    >
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-sm font-medium">{r.title}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {modules.map((m, mi) => (
              <tr key={m} className="text-sm">
                <td className="p-3 w-64 text-left">{m}</td>
                {roles.map((r, ri) => {
                  const p = generatePermissions(ri, mi, r);
                  const anyEnabled = p.view || p.create || p.edit || p.delete;
                  return (
                    <td key={r.title + m} className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {anyEnabled ? (
                          <>
                            {p.view && (
                              <PermissionBadge
                                enabled
                                color="blue"
                                title="View"
                              >
                                <Eye className="h-3 w-3" />
                              </PermissionBadge>
                            )}
                            {p.create && (
                              <PermissionBadge
                                enabled
                                color="green"
                                title="Create"
                              >
                                <Plus className="h-3 w-3" />
                              </PermissionBadge>
                            )}
                            {p.edit && (
                              <PermissionBadge
                                enabled
                                color="orange"
                                title="Edit"
                              >
                                <Edit className="h-3 w-3" />
                              </PermissionBadge>
                            )}
                            {p.delete && (
                              <PermissionBadge
                                enabled
                                color="red"
                                title="Delete"
                              >
                                <Trash className="h-3 w-3" />
                              </PermissionBadge>
                            )}
                          </>
                        ) : (
                          <XCircle className="text-muted-foreground h-5 w-5" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-lg border p-4 bg-gray-50">
        <h3 className="text-sm font-semibold mb-3">Permission Types</h3>
        <div className=" flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PermissionBadge enabled color="blue" title="View">
              <Eye className="h-4 w-4" />
            </PermissionBadge>
            <div className="text-sm">View</div>
          </div>

          <div className="flex items-center gap-3">
            <PermissionBadge enabled color="green" title="Create">
              <Plus className="h-4 w-4" />
            </PermissionBadge>
            <div className="text-sm">Create</div>
          </div>

          <div className="flex items-center gap-3">
            <PermissionBadge enabled color="orange" title="Edit">
              <Edit className="h-4 w-4" />
            </PermissionBadge>
            <div className="text-sm">Edit</div>
          </div>

          <div className="flex items-center gap-3">
            <PermissionBadge enabled color="red" title="Delete">
              <Trash className="h-4 w-4" />
            </PermissionBadge>
            <div className="text-sm">Delete</div>
          </div>
        </div>
      </div>
    </>
  );
}
