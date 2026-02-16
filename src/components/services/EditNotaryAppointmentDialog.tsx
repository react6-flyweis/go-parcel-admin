import { useEffect, useState, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
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
import { User, Phone, MapPin, FileText } from "lucide-react";

const editSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientPhone: z.string().min(1, "Please enter a valid phone"),
  serviceType: z.string().min(1, "Service type is required"),
  documentType: z.string().min(1, "Document type is required"),
  location: z.string().min(1, "Location is required"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  numberOfSigners: z.string().optional(),
  estimatedFee: z.string().optional(),
  specialNotes: z.string().optional(),
});

type EditFormValues = z.infer<typeof editSchema>;

type Appointment = {
  id: string;
  client: string;
  phone?: string;
  service?: string;
  documents?: string;
  appointment?: string; // combined date + time string
  status?: string;
  notary?: string;
  fee?: number;
  location?: string;
  signers?: number;
  notes?: string;
};

interface Props {
  children?: React.ReactNode;
  appointment: Appointment;
  onSave: (updated: Appointment) => void;
}

export default function EditNotaryAppointmentDialog({
  children,
  appointment,
  onSave,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);

  // Try to split existing appointment string into date/time when possible
  const splitAppointment = (ap?: string) => {
    if (!ap) return { date: "", time: "" };
    const parts = ap.split(" ");
    // naive: if format was 'YYYY-MM-DD HH:MM AM/PM' or '2024-01-15 10:00 AM'
    const date = parts[0] ?? "";
    const time = parts.slice(1).join(" ") ?? "";
    return { date, time };
  };

  const { date: initDate, time: initTime } = splitAppointment(
    appointment.appointment,
  );

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      clientName: appointment.client ?? "",
      clientPhone: appointment.phone ?? "",
      serviceType: appointment.service ?? "",
      documentType: appointment.documents ?? "",
      location: appointment.location ?? "",
      appointmentDate: initDate || "",
      appointmentTime: initTime || "",
      numberOfSigners: String(appointment.signers ?? ""),
      estimatedFee: appointment.fee != null ? String(appointment.fee) : "",
      specialNotes: appointment.notes ?? "",
    },
  });

  // reset form if the appointment prop changes (important when reusing the same component)
  useEffect(() => {
    const { date, time } = splitAppointment(appointment.appointment);
    form.reset({
      clientName: appointment.client ?? "",
      clientPhone: appointment.phone ?? "",
      serviceType: appointment.service ?? "",
      documentType: appointment.documents ?? "",
      location: appointment.location ?? "",
      appointmentDate: date || "",
      appointmentTime: time || "",
      numberOfSigners: String(appointment.signers ?? ""),
      estimatedFee: appointment.fee != null ? String(appointment.fee) : "",
      specialNotes: appointment.notes ?? "",
    });
  }, [appointment, form]);

  function onSubmit(values: EditFormValues) {
    const updated: Appointment = {
      ...appointment,
      client: values.clientName,
      phone: values.clientPhone,
      service: values.serviceType,
      documents: values.documentType,
      location: values.location,
      appointment: `${values.appointmentDate} ${values.appointmentTime}`.trim(),
      signers: values.numberOfSigners
        ? Number(values.numberOfSigners)
        : appointment.signers,
      fee: values.estimatedFee ? Number(values.estimatedFee) : appointment.fee,
      notes: values.specialNotes,
    };

    onSave(updated);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Edit Appointment</DialogTitle>
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
                            placeholder="Client Name"
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
                        <Input
                          className="bg-white"
                          placeholder="Service type"
                          {...field}
                        />
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
                            placeholder="Document type"
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
                            placeholder="Location"
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
                        placeholder="Notes..."
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
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
