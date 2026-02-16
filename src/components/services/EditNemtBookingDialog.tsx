import { useState, useEffect, type PropsWithChildren } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Phone, MapPin, Ambulance } from "lucide-react";

const nemtSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  patientPhone: z.string().min(7, "Please enter a valid phone"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  dropoffAddress: z.string().min(1, "Dropoff address is required"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  vehicleType: z.string().optional(),
  insuranceProvider: z.string().optional(),
  specialRequirements: z.string().optional(),
  wheelchairAccessible: z.boolean().optional(),
  oxygenRequired: z.boolean().optional(),
});

type NemtFormValues = z.infer<typeof nemtSchema>;

type EditNemtProps = PropsWithChildren<{
  booking?: Partial<NemtFormValues>;
  onSave?: (data: NemtFormValues) => void;
}>;

export default function EditNemtBookingDialog({
  children,
  booking,
  onSave,
}: EditNemtProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<NemtFormValues>({
    resolver: zodResolver(nemtSchema),
    defaultValues: {
      patientName: "",
      patientPhone: "",
      pickupAddress: "",
      dropoffAddress: "",
      appointmentDate: "",
      appointmentTime: "",
      vehicleType: "",
      insuranceProvider: "",
      specialRequirements: "",
      wheelchairAccessible: false,
      oxygenRequired: false,
    },
  });

  useEffect(() => {
    if (booking) {
      form.reset({
        patientName: booking.patientName ?? "",
        patientPhone: booking.patientPhone ?? "",
        pickupAddress: booking.pickupAddress ?? "",
        dropoffAddress: booking.dropoffAddress ?? "",
        appointmentDate: booking.appointmentDate ?? "",
        appointmentTime: booking.appointmentTime ?? "",
        vehicleType: booking.vehicleType ?? "",
        insuranceProvider: booking.insuranceProvider ?? "",
        specialRequirements: booking.specialRequirements ?? "",
        wheelchairAccessible: !!booking.wheelchairAccessible,
        oxygenRequired: !!booking.oxygenRequired,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking]);

  function onSubmit(data: NemtFormValues) {
    if (onSave) onSave(data);
    // eslint-disable-next-line no-console
    console.log("Update NEMT Booking:", data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Ambulance className="size-4 mr-2" />
            Edit Booking
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Edit NEMT Booking</DialogTitle>
          <DialogDescription className="sr-only">
            Update the patient and trip details
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
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="Enter patient name"
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
                  name="patientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Phone *</FormLabel>
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

              <div>
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            className="pl-10 bg-white"
                            placeholder="Enter pickup location"
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
                  name="dropoffAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dropoff Address *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Enter destination"
                          {...field}
                        />
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
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ambulance">Ambulance</SelectItem>
                            <SelectItem value="wheelchair">
                              Wheelchair Van
                            </SelectItem>
                            <SelectItem value="stretcher">
                              Stretcher Van
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
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="e.g., Medicare, Blue Cross"
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
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="E.g., wheelchair accessible, oxygen required, walker assistance..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="wheelchairAccessible"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Wheelchair Accessible</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oxygenRequired"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Oxygen Required</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t mt-2 pt-2" />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
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
