import { useState, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { User, Phone, MapPin, FileText, Plus } from "lucide-react";

const notarySchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientPhone: z.string().min(7, "Please enter a valid phone"),
  serviceType: z.string().min(1, "Service type is required"),
  documentType: z.string().min(1, "Document type is required"),
  location: z.string().min(1, "Location is required"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  numberOfSigners: z.string().min(1).optional(),
  estimatedFee: z.string().optional(),
  specialNotes: z.string().optional(),
});

type NotaryFormValues = z.infer<typeof notarySchema>;

export default function CreateNotaryAppointmentDialog({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const form = useForm<NotaryFormValues>({
    resolver: zodResolver(notarySchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      serviceType: "",
      documentType: "",
      location: "",
      appointmentDate: "",
      appointmentTime: "",
      numberOfSigners: "1",
      estimatedFee: "0.00",
      specialNotes: "",
    },
  });

  function onSubmit(data: NotaryFormValues) {
    // Replace with API call when backend is ready
    // eslint-disable-next-line no-console
    console.log("Create Notary Appointment:", data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="mr-2" />
            New Appointment
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Schedule New Notary Appointment</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the client and appointment details to schedule a notary.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-100 p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="Enter client name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Phone *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="(555) 000-0000"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mobile">
                              Mobile Notary
                            </SelectItem>
                            <SelectItem value="remote">
                              Remote Online Notary
                            </SelectItem>
                            <SelectItem value="loan">Loan Signing</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="e.g., Mortgage, Power of Attorney"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="Enter appointment location"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Date *</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appointmentTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Time *</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="numberOfSigners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Signers *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-white"
                          min={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimatedFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Fee</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specialNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Any special requirements or instructions..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t mt-2 pt-2" />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Schedule Appointment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
