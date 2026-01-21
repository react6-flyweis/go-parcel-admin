import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, UserCog } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  department: string;
  tempPassword: string;
  confirmPassword: string;
  require2fa: boolean;
  sendWelcome: boolean;
};

export default function AddAdminDialog({
  open,
  onOpenChange,
}: AddAdminDialogProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      role: "",
      department: "",
      tempPassword: "",
      confirmPassword: "",
      require2fa: true,
      sendWelcome: true,
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  const { watch, setValue } = form;

  const allPermissions = [
    "Dashboard",
    "Users",
    "Rides",
    "Drivers",
    "Parcels",
    "Support",
    "Analytics",
    "Settings",
  ];

  const rolePermissionsMap: Record<string, string[]> = {
    super: allPermissions,
    operations: ["Dashboard", "Rides", "Drivers", "Analytics"],
    support: ["Dashboard", "Users", "Support"],
    finance: ["Dashboard", "Parcels", "Settings"],
  };

  const selectedRole = watch("role");
  const shownPermissions = rolePermissionsMap[selectedRole] ?? [
    "Dashboard",
    "Users",
    "Rides",
    "Drivers",
    "Parcels",
    "Support",
  ];

  //   const generatePassword = () => {
  //     const pwd = Math.random().toString(36).slice(-10) + "A1!";
  //     setValue("tempPassword", pwd);
  //     setValue("confirmPassword", pwd);
  //   };

  const onSubmit = (values: FormValues) => {
    // remove confirmPassword before sending
    const payload = { ...values };
    // delete payload.confirmPassword;
    console.log("Create Admin:", payload);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <UserCog className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Add New Admin User</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-5 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-base">
                  Personal Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@goparcel.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="New York, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Role & Access</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="super">Super Admin</SelectItem>
                              <SelectItem value="operations">
                                Operation Admin
                              </SelectItem>
                              <SelectItem value="support">
                                Support Manager
                              </SelectItem>
                              <SelectItem value="finance">
                                Finance Admin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="operations">
                                Operations
                              </SelectItem>
                              <SelectItem value="support">
                                Customer Support
                              </SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Security Settings</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="tempPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temporary Password *</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Generate secure password"
                              {...field}
                            />
                            {/* <Button
                              type="button"
                              onClick={generatePassword}
                              className="ml-2"
                            >
                              Generate
                            </Button> */}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password *</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirm password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="inline-flex items-center gap-2">
                    <Checkbox
                      checked={watch("require2fa")}
                      onCheckedChange={(v) => setValue("require2fa", !!v)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">
                      Require Two-Factor Authentication (2FA)
                    </span>
                  </label>

                  <label className="inline-flex items-center gap-2">
                    <Checkbox
                      checked={watch("sendWelcome")}
                      onCheckedChange={(v) => setValue("sendWelcome", !!v)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">
                      Send welcome email with login credentials
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Permissions Preview</h3>
                <div className="p-4 rounded bg-muted-foreground/10">
                  <div className="grid grid-cols-3 gap-2">
                    {shownPermissions.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {p}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-green-600">
                    Customize permissions →
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Create Admin User
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
