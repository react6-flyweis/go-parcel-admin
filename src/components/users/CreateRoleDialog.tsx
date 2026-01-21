import { useForm } from "react-hook-form";
import type { Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  //   DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  SaveIcon,
  Key,
  BarChart2,
  Activity,
  Users,
  User,
  UserPlus,
  Box,
  Truck,
  Car,
  Layers,
  Handshake,
  HelpCircle,
  AlertTriangle,
  BookOpen,
  FileText,
  DollarSign,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const modules = [
  { key: "dashboard", label: "Dashboard", icon: BarChart2 },
  { key: "user_management", label: "User Management", icon: Users },
  { key: "admin_users", label: "Admin Users", icon: UserPlus },
  { key: "customers", label: "Customers", icon: User },
  { key: "parcel_delivery", label: "Parcel Delivery", icon: Box },
  { key: "ride_booking", label: "Ride Booking", icon: Car },
  { key: "specialized_services", label: "Specialized Services", icon: Layers },
  { key: "drivers", label: "Drivers", icon: Truck },
  { key: "partners", label: "Partners", icon: Handshake },
  { key: "fleet_management", label: "Fleet Management", icon: Truck },
  { key: "support_tickets", label: "Support & Tickets", icon: HelpCircle },
  { key: "disputes", label: "Disputes", icon: AlertTriangle },
  { key: "faq_management", label: "FAQ Management", icon: BookOpen },
  { key: "analytics", label: "Analytics", icon: Activity },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "billing_payments", label: "Billing & Payments", icon: DollarSign },
  { key: "system_settings", label: "System Settings", icon: Settings },
];

type PermissionKey = "view" | "create" | "edit" | "delete";

type PermissionRecord = Record<PermissionKey, boolean>;

const permissionSchema = z.object({
  view: z.boolean(),
  create: z.boolean(),
  edit: z.boolean(),
  delete: z.boolean(),
});

const formSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
  color: z.string().regex(/^#([0-9a-fA-F]{6})$/, "Invalid color"),
  permissions: z.record(z.string(), permissionSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateRoleDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const initialPermissions: Record<string, Record<PermissionKey, boolean>> = {};
  modules.forEach((m) => {
    initialPermissions[m.key] = {
      view: false,
      create: false,
      edit: false,
      delete: false,
    };
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#1d4ed8",
      permissions: initialPermissions,
    },
  });

  const { handleSubmit, reset, setValue } = form;

  function selectAll() {
    const next: Record<string, Record<PermissionKey, boolean>> = {};
    modules.forEach((m) => {
      next[m.key] = { view: true, create: true, edit: true, delete: true };
    });
    setValue("permissions", next);
  }

  function clearAll() {
    const next: Record<string, Record<PermissionKey, boolean>> = {};
    modules.forEach((m) => {
      next[m.key] = { view: false, create: false, edit: false, delete: false };
    });
    setValue("permissions", next);
  }

  function onSubmit(values: FormValues) {
    const payload = { ...values };
    console.log("Create role", payload);
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-green-50 text-green-600">
              <Key className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg">Create New Role</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Operations Admin"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the purpose..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 h-10 p-0 border rounded"
                          />
                          <div className="text-sm text-muted-foreground">
                            {field.value}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Permissions</div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-gray-100 text-foreground"
                      size="sm"
                      onClick={selectAll}
                    >
                      <CheckCircle />
                      Select All
                    </Button>
                    <Button
                      className="bg-gray-100 text-foreground"
                      size="sm"
                      onClick={clearAll}
                    >
                      <XCircle />
                      Clear All
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {modules.map((m) => (
                    <FormField
                      key={m.key}
                      control={form.control}
                      name={`permissions.${m.key}` as Path<FormValues>}
                      render={({ field }) => (
                        <div className="border bg-gray-50 rounded-lg p-5 flex flex-col gap-4 justify-between">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-muted/10 text-muted-foreground">
                              {/* icon component from modules */}
                              <m.icon className="size-5" />
                            </div>
                            <div>
                              <div className="font-medium">{m.label}</div>
                              <div className="text-xs text-muted-foreground">
                                Control access to {m.label.toLowerCase()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 justify-between">
                            <label className="flex items-center gap-2">
                              <Checkbox
                                checked={
                                  !!(
                                    field.value as PermissionRecord | undefined
                                  )?.view
                                }
                                onCheckedChange={(v) =>
                                  field.onChange({
                                    ...((field.value as PermissionRecord) ??
                                      {}),
                                    view: !!v,
                                  })
                                }
                              />
                              <span className="text-sm">View</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <Checkbox
                                checked={
                                  !!(
                                    field.value as PermissionRecord | undefined
                                  )?.create
                                }
                                onCheckedChange={(v) =>
                                  field.onChange({
                                    ...((field.value as PermissionRecord) ??
                                      {}),
                                    create: !!v,
                                  })
                                }
                              />
                              <span className="text-sm">Create</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <Checkbox
                                checked={
                                  !!(
                                    field.value as PermissionRecord | undefined
                                  )?.edit
                                }
                                onCheckedChange={(v) =>
                                  field.onChange({
                                    ...((field.value as PermissionRecord) ??
                                      {}),
                                    edit: !!v,
                                  })
                                }
                              />
                              <span className="text-sm">Edit</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <Checkbox
                                checked={
                                  !!(
                                    field.value as PermissionRecord | undefined
                                  )?.delete
                                }
                                onCheckedChange={(v) =>
                                  field.onChange({
                                    ...((field.value as PermissionRecord) ??
                                      {}),
                                    delete: !!v,
                                  })
                                }
                              />
                              <span className="text-sm">Delete</span>
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  <SaveIcon className="h-4 w-4 mr-2" /> Create Role
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
