import { useState, type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  stops?: string[]; // pickup locations (one per line)
  dropoff?: string;
  vehicleType?: string;
  driver?: string;
  specialNotes?: string;
  wifiAvailable?: boolean;
  wheelchairAccessible?: boolean;
};

type Props = PropsWithChildren<{
  route?: ShuttleRoute;
  onSave?: (r: ShuttleRoute) => void;
}>;

export default function EditShuttleRouteDialog({
  children,
  route,
  onSave,
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
    stops: ["Downtown Transit", "Park Square", "Financial District"],
    dropoff: "Tech Corp Campus, Burlington",
    vehicleType: "40-Passenger",
    driver: "David Martinez",
    specialNotes: "Service requirements, special instructions...",
    wifiAvailable: true,
    wheelchairAccessible: false,
  };

  const r = { ...defaults, ...(route || {}) } as Required<ShuttleRoute>;

  const [name, setName] = useState(r.name);
  const [org, setOrg] = useState(r.org);
  const [phone, setPhone] = useState(r.phone);
  const [pickupText, setPickupText] = useState(r.stops.join("\n"));
  const [dropoff, setDropoff] = useState(r.dropoff);
  const [schedule, setSchedule] = useState(r.schedule);
  const [frequency, setFrequency] = useState(r.frequency);
  const [vehicleType, setVehicleType] = useState(r.vehicleType);
  const [capacity, setCapacity] = useState<number | "">(r.capacity);
  const [rate, setRate] = useState<number | "">(r.rate);
  const [specialNotes, setSpecialNotes] = useState(r.specialNotes || "");
  const [driver, setDriver] = useState(r.driver || "");
  const [wifiAvailable, setWifiAvailable] = useState(!!r.wifiAvailable);
  const [wheelchairAccessible, setWheelchairAccessible] = useState(
    !!r.wheelchairAccessible,
  );

  function handleSave() {
    const updated: ShuttleRoute = {
      id: r.id,
      name,
      org,
      phone,
      schedule,
      frequency,
      vehicleType,
      capacity: Number(capacity) || 0,
      rate: Number(rate) || 0,
      stops: pickupText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      dropoff,
      specialNotes,
      driver,
      wifiAvailable,
      wheelchairAccessible,
    };

    onSave?.(updated);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton
        className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0 bg-gray-50"
      >
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">
            Edit Shuttle Route
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Route Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Organization Name *
              </label>
              <Input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Contact Phone *
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Pickup Locations *
            </label>
            <Textarea
              rows={4}
              placeholder="Enter pickup locations (one per line)"
              value={pickupText}
              onChange={(e) => setPickupText(e.target.value)}
              className="w-full bg-white shadow-sm"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Drop-off Location *
            </label>
            <Input
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Schedule Time *
              </label>
              <Input
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Frequency *
              </label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v)}>
                <SelectTrigger className="w-full bg-white shadow-sm">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Mon-Fri">Mon-Fri</SelectItem>
                  <SelectItem value="Every 2 Hours">Every 2 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Vehicle Type *
              </label>
              <Select
                value={vehicleType}
                onValueChange={(v) => setVehicleType(v)}
              >
                <SelectTrigger className="w-full bg-white shadow-sm">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40-Passenger">40-Passenger</SelectItem>
                  <SelectItem value="12-Passenger">12-Passenger</SelectItem>
                  <SelectItem value="Shuttle Van">Shuttle Van</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Max Passengers
              </label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) =>
                  setCapacity(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="w-full bg-white shadow-sm"
                min={0}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Monthly Rate
              </label>
              <Input
                type="number"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full bg-white shadow-sm"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Special Notes
            </label>
            <Textarea
              rows={3}
              placeholder="Service requirements, special instructions..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-white shadow-sm"
            />
          </div>

          <div className="w-1/2 space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Driver
              </label>
              <Input
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                className="w-full bg-white shadow-sm"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={wifiAvailable}
                  onCheckedChange={(v) => setWifiAvailable(Boolean(v))}
                />
                <div className="text-sm">WiFi Available</div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={wheelchairAccessible}
                  onCheckedChange={(v) => setWheelchairAccessible(Boolean(v))}
                />
                <div className="text-sm">Wheelchair Accessible</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pb-4 pt-2 border-t">
          <div className="flex items-center justify-between w-full">
            <div />
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-green-500 hover:bg-green-600 rounded-full"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
