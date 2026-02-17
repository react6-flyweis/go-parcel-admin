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

type MovingJob = {
  id?: string;
  customer?: string;
  phone?: string;
  size?: string;
  date?: string;
  status?: string;
  crew?: string;
  cost?: number;
  pickupAddress?: string;
  deliveryAddress?: string;
  numberOfItems?: number | string;
  specialItems?: string;
  specialInstructions?: string;
  estimatedHours?: string | number;
};

const movingSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(1, "Please enter a valid phone"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  movingDate: z.string().optional(),
  startTime: z.string().optional(),
  moveSize: z.string().optional(),
  estimatedHours: z.string().optional(),
  numberOfItems: z.string().optional(),
  specialItems: z.string().optional(),
  specialInstructions: z.string().optional(),
  crew: z.string().optional(),
  totalCost: z.string().optional(),
});

type MovingFormValues = z.infer<typeof movingSchema>;

function mapSizeToValue(size?: string) {
  if (!size) return "";
  const s = size.toLowerCase();
  if (s.includes("studio")) return "studio";
  if (s.includes("1")) return "1br";
  if (s.includes("2")) return "2br";
  if (s.includes("3")) return "3br";
  return "4br+";
}

export default function EditMovingJobDialog({
  children,
  job,
}: PropsWithChildren<{ job?: MovingJob }>) {
  const [open, setOpen] = useState(false);

  const form = useForm<MovingFormValues>({
    resolver: zodResolver(movingSchema),
    defaultValues: {
      customerName: job?.customer ?? "",
      customerPhone: job?.phone ?? "",
      pickupAddress: job?.pickupAddress ?? "",
      deliveryAddress: job?.deliveryAddress ?? "",
      movingDate: job?.date ? job.date.split(" ")[0] : "",
      startTime: "",
      moveSize: mapSizeToValue(job?.size),
      estimatedHours: job?.estimatedHours ? String(job.estimatedHours) : "",
      numberOfItems: job?.numberOfItems ? String(job.numberOfItems) : "",
      specialItems: job?.specialItems ?? "",
      specialInstructions: job?.specialInstructions ?? "",
      crew: job?.crew ?? "",
      totalCost: job?.cost ? String(job.cost) : "",
    },
  });

  function onSubmit(data: MovingFormValues) {
    // Replace with API call to save changes
    console.log("Update Moving Job", job?.id ?? "(new)", data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Edit Moving Job</DialogTitle>
          <DialogDescription className="sr-only">
            Update job details and save changes.
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
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Customer name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Phone *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="(555) 000-0000"
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
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Address *</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Pickup address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address *</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Delivery address"
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
                  name="movingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moving Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="moveSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Move Size *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="1br">1 Bedroom</SelectItem>
                            <SelectItem value="2br">2 Bedroom</SelectItem>
                            <SelectItem value="3br">3 Bedroom</SelectItem>
                            <SelectItem value="4br+">4 Bedroom +</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimatedHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Hours</FormLabel>
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
                  name="numberOfItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Items</FormLabel>
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
              </div>

              <FormField
                control={form.control}
                name="specialItems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="e.g., Piano"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Any special instructions"
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
                  name="crew"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crew</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Team Alpha (4 movers)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Cost</FormLabel>
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
