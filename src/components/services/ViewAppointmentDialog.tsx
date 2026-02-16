import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  User,
  Phone,
  MapPin,
  FileText,
  //   DollarSign,
} from "lucide-react";

type Appointment = {
  id: string;
  client: string;
  phone?: string;
  service?: string;
  documents?: string;
  appointment?: string;
  status?: string;
  notary?: string;
  fee?: number;
  location?: string;
  signers?: number;
  notes?: string;
};

interface ViewAppointmentDialogProps {
  children: React.ReactNode;
  appointment?: Appointment | null;
  editTrigger?: React.ReactNode;
}

export default function ViewAppointmentDialog({
  children,
  appointment,
  editTrigger,
}: ViewAppointmentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto p-0 bg-gray-50">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">
            Appointment Details - {appointment?.id ?? ""}
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Client Information</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>{appointment?.client ?? "-"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>{appointment?.phone ?? "-"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>{appointment?.service ?? "-"}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                Appointment Details
              </h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>{appointment?.appointment ?? "-"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>{appointment?.documents ?? "-"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>Notary: {appointment?.notary ?? "-"}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Location</h3>
            <div className="rounded-md bg-violet-50 p-4 flex items-start gap-4">
              <MapPin className="size-6 text-violet-600" />
              <div className="text-sm text-muted-foreground">
                <div className="font-medium">Appointment Location</div>
                <div className="text-xs">{appointment?.location ?? "-"}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-md bg-white p-4">
                <div className="text-xs text-muted-foreground">
                  Number of Signers
                </div>
                <div className="text-2xl font-semibold">
                  {appointment?.signers ?? "-"}
                </div>
              </div>

              <div className="rounded-md bg-white p-4">
                <div className="text-xs text-muted-foreground">Service Fee</div>
                <div className="text-2xl font-semibold text-green-600 flex items-center gap-2">
                  {/* <DollarSign className="h-5 w-5" /> */}
                  <span>
                    {appointment?.fee != null
                      ? `$${appointment.fee.toFixed(2)}`
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Special Notes</h3>
            <div className="rounded-md bg-white p-3 text-sm text-muted-foreground">
              {appointment?.notes ?? "—"}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pb-4 pt-2 border-t">
          <div className="flex items-center justify-between w-full">
            <Badge className="rounded-full bg-blue-500 text-white px-3 py-1 text-xs">
              {appointment?.status ?? ""}
            </Badge>

            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>

              {/** allow parent to inject an edit dialog trigger (keeps this component reusable) */}
              {editTrigger ? (
                editTrigger
              ) : (
                <Button className="bg-green-500 hover:bg-green-600">
                  Edit Appointment
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
