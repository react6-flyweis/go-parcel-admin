import { useState, type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  User,
  Phone,
  Home,
  Calendar,
  Users,
  Box,
  MapPin,
  ArrowRight,
  //   DollarSign,
} from "lucide-react";

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
  numberOfItems?: number;
  specialItems?: string;
  specialInstructions?: string;
  estimatedHours?: string | number;
};

type Props = PropsWithChildren<{
  job?: MovingJob;
  editTrigger?: React.ReactNode;
}>;

export default function ViewMovingJobDialog({
  children,
  job,
  editTrigger,
}: Props) {
  const [open, setOpen] = useState(false);

  const defaults: Required<MovingJob> = {
    id: "MOV-3001",
    customer: "James Wilson",
    phone: "(555) 444-5555",
    size: "3 Bedroom",
    date: "2024-01-20 08:00 AM",
    status: "Scheduled",
    crew: "Team Alpha (4 movers)",
    cost: 850.0,
    pickupAddress: "123 Elm St, Boston, MA 02108",
    deliveryAddress: "456 Oak Ave, Cambridge, MA 02139",
    numberOfItems: 45,
    specialItems: "Piano, antique furniture",
    specialInstructions: "Elevator available at both locations",
    estimatedHours: "6h",
  };

  const id = job?.id ?? defaults.id;
  const customer = job?.customer ?? defaults.customer;
  const phone = job?.phone ?? defaults.phone;
  const size = job?.size ?? defaults.size;
  const date = job?.date ?? defaults.date;
  const status = job?.status ?? defaults.status;
  const crew = job?.crew ?? defaults.crew;
  const cost = job?.cost ?? defaults.cost;
  const pickup = job?.pickupAddress ?? defaults.pickupAddress;
  const delivery = job?.deliveryAddress ?? defaults.deliveryAddress;
  const items = job?.numberOfItems ?? defaults.numberOfItems;
  const specialItems = job?.specialItems ?? defaults.specialItems;
  const specialInstructions =
    job?.specialInstructions ?? defaults.specialInstructions;
  const estimatedHours = job?.estimatedHours ?? defaults.estimatedHours;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0 bg-gray-50">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">
            Job Details - {id}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Customer Information
              </h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>{customer}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>{phone}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>{size}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Job Details</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>{date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>{crew}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Box className="h-4 w-4 text-muted-foreground" />
                  <div>{items} items</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Route</h4>
            <div className="flex flex-col items-center gap-3">
              <div className="w-full rounded-md bg-amber-50 p-4 flex items-start gap-4">
                <div className="p-2 rounded-full bg-white shadow-sm">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">Pickup Location</div>
                  <div className="text-xs">{pickup}</div>
                </div>
              </div>

              <div className="text-muted-foreground">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div className="w-full rounded-md bg-emerald-50 p-4 flex items-start gap-4">
                <div className="p-2 rounded-full bg-white shadow-sm">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">Delivery Location</div>
                  <div className="text-xs">{delivery}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Special Items</h4>
            <div className="rounded-md bg-amber-50 p-3 text-sm text-muted-foreground">
              {specialItems || "—"}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Special Instructions</h4>
            <div className="rounded-md bg-white p-3 text-sm text-muted-foreground">
              {specialInstructions || "—"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-md bg-white p-4">
                <div className="text-xs text-muted-foreground">
                  Estimated Hours
                </div>
                <div className="text-2xl font-semibold">{estimatedHours}</div>
              </div>

              <div className="rounded-md bg-white p-4">
                <div className="text-xs text-muted-foreground">Total Cost</div>
                <div className="text-2xl font-semibold text-green-600">
                  <div className="flex items-center gap-2">
                    {/* <DollarSign className="h-4 w-4" /> */}
                    <span>
                      {cost != null ? `$${Number(cost).toFixed(2)}` : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pb-4 pt-2 border-t">
          <div className="flex items-center justify-between w-full">
            <Badge className="rounded-full bg-blue-500 text-white px-3 py-1 text-xs">
              {status}
            </Badge>

            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>

              {editTrigger ? (
                editTrigger
              ) : (
                <Button className="bg-green-500 hover:bg-green-600">
                  Edit Job
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
