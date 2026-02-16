import { useState, type PropsWithChildren } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  User,
  Phone,
  Truck,
  DollarSign,
  FileText,
} from "lucide-react";
import EditNemtBookingDialog from "./EditNemtBookingDialog";

type Props = PropsWithChildren<{ booking: any }>;

export default function ViewNemtBookingDialog({ children, booking }: Props) {
  const [open, setOpen] = useState(false);

  const staticDefaults = {
    id: "NEMT-1001",
    patient: "John Smith",
    phone: "(555) 123-4567",
    insurance: "Medicare",
    appointment: "2024-01-15 09:00 AM",
    vehicle: "Wheelchair Van",
    driver: "Robert Wilson",
    status: "Scheduled",
    cost: 85.0,
    pickup: "123 Medical Center Dr, Boston",
    destination: "Mass General Hospital, Boston",
    special: "Wheelchair accessible, oxygen tank",
  };

  const id = booking?.id ?? staticDefaults.id;
  const patient =
    booking?.patient ?? booking?.patientName ?? staticDefaults.patient;
  const phone = booking?.patientPhone ?? booking?.phone ?? staticDefaults.phone;
  const insurance =
    booking?.insurance ?? booking?.coverage ?? staticDefaults.insurance;
  const appointment =
    booking?.appointment ??
    booking?.appointmentDate ??
    staticDefaults.appointment;
  const vehicle =
    booking?.vehicle ?? booking?.vehicleType ?? staticDefaults.vehicle;
  const driver =
    booking?.driver ?? booking?.driverName ?? staticDefaults.driver;
  const status = booking?.status ?? staticDefaults.status;
  const cost =
    typeof booking?.cost === "number"
      ? booking.cost
      : (booking?.estimatedCost ?? staticDefaults.cost);
  const pickup =
    booking?.pickupAddress ?? booking?.pickup ?? staticDefaults.pickup;
  const destination =
    booking?.dropoffAddress ??
    booking?.destination ??
    staticDefaults.destination;
  const special =
    booking?.specialRequirements ?? booking?.notes ?? staticDefaults.special;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-lg font-semibold">
            Booking Details - {id}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Patient Information
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{patient}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>{insurance}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Trip Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{appointment}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span>{vehicle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Driver: {driver}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Route</h4>
            <div className="space-y-3">
              <div className="rounded-md bg-green-50 p-3 flex items-start gap-3">
                <div className="p-2 rounded-full bg-white shadow-sm">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Pickup</div>
                  <div className="text-gray-600">{pickup || "-"}</div>
                </div>
              </div>

              <div className="rounded-md bg-red-50 p-3 flex items-start gap-3">
                <div className="p-2 rounded-full bg-white shadow-sm">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Destination</div>
                  <div className="text-gray-600">{destination || "-"}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Special Requirements</h4>
            <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
              {special || "None"}
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <Badge className="rounded">{status}</Badge>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">Estimated Cost</div>
              <div className="text-green-600 font-semibold text-lg flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>
                  {cost != null ? `$${Number(cost).toFixed(2)}` : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <div className="flex items-center gap-3 ml-auto">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>

            <EditNemtBookingDialog
              booking={{
                patientName: patient,
                patientPhone: phone,
                pickupAddress: pickup,
                dropoffAddress: destination,
                appointmentDate: appointment,
                vehicleType: vehicle,
                specialRequirements: special,
              }}
            >
              <Button> Edit Booking </Button>
            </EditNemtBookingDialog>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
