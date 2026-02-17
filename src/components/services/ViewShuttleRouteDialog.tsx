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
import { Bus, Phone, Calendar, Users, MapPin, CheckCircle } from "lucide-react";

type Stop = {
  title: string;
  subtitle?: string;
  kind?: "pickup" | "final";
};

type ShuttleRoute = {
  id?: string;
  name?: string;
  org?: string;
  phone?: string;
  schedule?: string;
  frequency?: string;
  capacity?: number;
  status?: string;
  rate?: number;
  stops?: Stop[];
  vehicleType?: string;
  driver?: string;
  specialNotes?: string;
};

type Props = PropsWithChildren<{
  route?: ShuttleRoute;
  editTrigger?: React.ReactNode;
}>;

export default function ViewShuttleRouteDialog({
  children,
  route,
  editTrigger,
}: Props) {
  const [open, setOpen] = useState(false);

  const defaults: Required<ShuttleRoute> = {
    id: "SHU-4001",
    name: "Corporate Campus Shuttle",
    org: "Tech Corp Inc",
    phone: "(555) 777-8888",
    schedule: "Mon-Fri 07:00 AM",
    frequency: "Daily",
    capacity: 35,
    status: "Active",
    rate: 8500,
    stops: [
      { title: "Pickup Stop", subtitle: "Downtown Transit", kind: "pickup" },
      { title: "Pickup Stop", subtitle: "Park Square", kind: "pickup" },
      { title: "Pickup Stop", subtitle: "Financial District", kind: "pickup" },
      {
        title: "Final Destination",
        subtitle: "Tech Corp Campus, Burlington",
        kind: "final",
      },
    ],
    vehicleType: "40-Passenger Bus",
    driver: "David Martinez",
    specialNotes: "Peak hours route, return trip at 5:30 PM",
  };

  const r = { ...defaults, ...route } as Required<ShuttleRoute>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0 bg-gray-50">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">
            Route Details - {r.id}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Organization Information
              </h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <div>{r.name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>{r.org}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>{r.phone}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Route Details</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>{r.schedule}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>{r.frequency}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>{r.capacity} passengers</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Route Stops</h4>
            <div className="flex flex-col gap-3">
              {r.stops?.map((s, i) => (
                <div
                  key={i}
                  className={`w-full rounded-md p-4 flex items-start gap-4 ${
                    s.kind === "final" ? "bg-emerald-50" : "bg-cyan-50"
                  }`}
                >
                  {s.kind === "final" ? (
                    <div className="p-2 rounded-full bg-white shadow-sm text-emerald-600">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-cyan-500 text-white font-semibold">
                      {i + 1}
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium">{s.title}</div>
                    {s.subtitle && <div className="text-xs">{s.subtitle}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-md bg-white p-4">
              <div className="text-xs text-muted-foreground">Vehicle Type</div>
              <div className="text-lg font-semibold">{r.vehicleType}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Driver: {r.driver}
              </div>
            </div>

            <div className="rounded-md bg-white p-4">
              <div className="text-xs text-muted-foreground">Monthly Rate</div>
              <div className="text-2xl font-semibold text-green-600">
                ${Number(r.rate).toLocaleString()}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Special Notes</h4>
            <div className="rounded-md bg-white p-3 text-sm text-muted-foreground">
              {r.specialNotes || "—"}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pb-4 pt-2 border-t">
          <div className="flex items-center justify-between w-full">
            <Badge className="rounded-full bg-green-500 text-white px-3 py-1 text-xs">
              {r.status}
            </Badge>

            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>

              {editTrigger ? (
                editTrigger
              ) : (
                <Button className="bg-green-500 hover:bg-green-600">
                  Edit Route
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
