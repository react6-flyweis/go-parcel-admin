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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Bus, Phone } from "lucide-react";

const shuttleSchema = z.object({
  routeName: z.string().min(1, "Route name is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  contactPhone: z.string().min(7, "Please enter a valid phone"),
  pickupLocations: z.string().min(1, "Pickup locations are required"),
  dropoffLocation: z.string().min(1, "Drop-off location is required"),
  scheduleTime: z.string().min(1, "Schedule time is required"),
  frequency: z.string().min(1, "Frequency is required"),
  vehicleType: z.string().optional(),
  maxPassengers: z.string().optional(),
  monthlyRate: z.string().optional(),
  specialNotes: z.string().optional(),
  wifiAvailable: z.boolean().optional(),
  wheelchairAccessible: z.boolean().optional(),
});

type ShuttleFormValues = z.infer<typeof shuttleSchema>;

export default function CreateShuttleRouteDialog({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const form = useForm<ShuttleFormValues>({
    resolver: zodResolver(shuttleSchema),
    defaultValues: {
      routeName: "",
      organizationName: "",
      contactPhone: "",
      pickupLocations: "",
      dropoffLocation: "",
      scheduleTime: "",
      frequency: "",
      vehicleType: "",
      maxPassengers: "0",
      monthlyRate: "0.00",
      specialNotes: "",
      wifiAvailable: false,
      wheelchairAccessible: false,
    },
  });

  function onSubmit(data: ShuttleFormValues) {
    // TODO: hook up API
    // eslint-disable-next-line no-console
    console.log("Create New Shuttle Route:", data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="bg-green-500 hover:bg-green-600">
            <Bus className="mr-2" />
            New Shuttle Route
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Create New Shuttle Route</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in route details to create a shuttle route
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-100 p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="routeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Name *</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="e.g., Corporate Campus Shuttle"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Enter organization"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone *</FormLabel>
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

              <FormField
                control={form.control}
                name="pickupLocations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Locations *</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Enter pickup locations (one per line)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drop-off Location *</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter final destination"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="scheduleTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Time *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="e.g., Mon-Fri 07:00 AM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                            <SelectValue placeholder="Select vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minibus">Minibus</SelectItem>
                            <SelectItem value="shuttle">Shuttle Bus</SelectItem>
                            <SelectItem value="coach">Coach</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxPassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Passengers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rate</FormLabel>
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
                        placeholder="Service requirements, special instructions..."
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
                  name="wifiAvailable"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>WiFi Available</FormLabel>
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
              </div>

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
                  Create Route
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
