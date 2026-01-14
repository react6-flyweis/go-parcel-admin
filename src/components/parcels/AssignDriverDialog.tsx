import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  CheckIcon,
  Phone,
  Star,
  MapPin,
  User,
  CheckCircleIcon,
  Car,
  TrendingUpIcon,
} from "lucide-react";

type Driver = {
  id: string;
  name: string;
  phone: string;
  rating: string;
  vehicle: string;
  eta: string;
  tripsToday: number;
  specialties: string[];
  available?: boolean;
};

const drivers: Driver[] = [
  {
    id: "mike",
    name: "Mike Johnson",
    phone: "+1-555-0201",
    rating: "4.9",
    vehicle: "Honda CR-V",
    eta: "5 mins",
    tripsToday: 12,
    specialties: ["Documents", "Small Packages"],
    available: true,
  },
  {
    id: "sarah",
    name: "Sarah Wilson",
    phone: "+1-555-0102",
    rating: "4.7",
    vehicle: "Toyota Prius",
    eta: "8 mins",
    tripsToday: 8,
    specialties: ["Grocery", "Fragile"],
    available: true,
  },
];

export default function AssignDriverDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Driver | null>(null);

  const filtered = drivers.filter((d) =>
    (d.name + d.phone + d.vehicle).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 gap-0 overflow-y-scroll">
        <DialogHeader className="flex flex-row border-b items-center gap-4 p-4">
          <div className="shrink-0 w-12 h-12 rounded-lg bg-linear-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-white">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-lg">Assign Driver</DialogTitle>
            <DialogDescription className="mt-1">
              Select a driver for this delivery
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-4 bg-gray-50 p-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers by name or vehicle..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <div className="w-40">
            <Input
              placeholder="Sort by:"
              className="border-0 shadow-none bg-white"
            />
          </div>
        </div>

        <div className="p-5 space-y-4">
          {filtered.map((d) => (
            <div
              key={d.id}
              className={`relative rounded-lg border p-4 flex items-center gap-4 cursor-pointer transition-shadow hover:shadow ${
                selected?.id === d.id
                  ? "ring-2 ring-green-200 bg-primary/10 border-green-200"
                  : "bg-white"
              }`}
              onClick={() => setSelected(d)}
            >
              {d.available && (
                <Badge className="absolute right-4 top-4 bg-emerald-500 text-white px-3 py-1 rounded-full">
                  Available
                </Badge>
              )}

              <div className="relative shrink-0">
                <Avatar className="size-16 ">
                  <AvatarFallback className="bg-linear-to-br from-emerald-400 to-sky-500 text-white">
                    {d.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {d.available && (
                  <div className="absolute -right-1 -bottom-1 border-2 rounded-full text-white border-white bg-green-500 flex justify-center items-center h-5 w-5">
                    <CheckCircleIcon className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-base truncate">
                        {d.name}
                      </div>
                      {selected?.id === d.id && (
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground mt-1 flex items-center gap-4">
                      <div className="flex items-center gap-1 truncate">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{d.phone}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="font-medium">{d.rating}</span>
                        <span className="text-muted-foreground">
                          ({d.tripsToday} trips)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Car className="size-4 text-blue-500" />
                        <div className="truncate">
                          <div className="font-medium truncate">
                            {d.vehicle}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            NYC-1234
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-blue-500" />
                        <div>
                          <div className="font-medium">0.8 km away</div>
                          <div className="text-xs text-muted-foreground">
                            ETA: {d.eta}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <TrendingUpIcon className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="text-sm  font-medium">
                            {d.tripsToday} trips today
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Empty
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-2 items-center">
                      <span className="text-sm text-gray-800">Specialty</span>
                      <div className="flex gap-2">
                        {d.specialties.map((s) => (
                          <Badge
                            key={s}
                            className="bg-transparent rounded border border-gray-200 text-gray-500 py-0"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex items-center sm:justify-between p-5">
          <div className="text-sm text-muted-foreground flex items-center gap-3">
            {selected ? (
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span>
                  Selected:{" "}
                  <span className="font-semibold">{selected.name}</span> • ETA:{" "}
                  <span className="text-emerald-500">{selected.eta}</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-gray-100 text-muted-foreground flex items-center justify-center">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span>No driver selected</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!selected}
              onClick={() => {
                // TODO: call assign API
                setOpen(false);
                setSelected(null);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
            >
              <CheckIcon className="h-4 w-4 text-white" />
              Assign Driver
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
