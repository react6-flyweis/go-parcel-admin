import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paperclip } from "lucide-react";
import FileUploader from "@/components/support/FileUploader";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: "general", label: "General" },
  { value: "delivery", label: "Delivery" },
  { value: "payment", label: "Payment" },
  { value: "refund", label: "Refund" },
  { value: "technical", label: "Technical" },
];

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  orderReference: z.string().optional(),
  subject: z.string().min(5, "Subject is too short"),
  category: z.string().optional(),
  priority: z.string().optional(),
  assignTo: z.string().optional(),
  description: z.string().min(10, "Description is too short"),
});

export default function CreateTicketDialog({
  open,
  onOpenChange,
}: CreateTicketDialogProps) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      orderReference: "",
      subject: "",
      category: "",
      priority: "",
      assignTo: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      attachments: files.map((f) => ({ name: f.name, size: f.size })),
    };
    console.log("Create Ticket:", payload);
    form.reset();
    setFiles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Paperclip className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Create Support Ticket</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-5 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-base">
                  Customer Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name *</FormLabel>
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
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order/Booking Reference</FormLabel>
                        <FormControl>
                          <Input placeholder="ORD-2024-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Ticket Details</h3>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief description of the issue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priorities.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assignTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign To</FormLabel>
                        <FormControl>
                          <Input placeholder="Agent name or email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the issue..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Attachments</FormLabel>
                  <FileUploader
                    files={files}
                    onFilesChange={setFiles}
                    accept="application/pdf,image/*"
                  />
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
                  Create Ticket
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
