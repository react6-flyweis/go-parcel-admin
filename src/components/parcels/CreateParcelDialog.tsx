import { useState, type PropsWithChildren } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, User, MapPin, CarIcon } from "lucide-react";

export default function CreateParcelDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [parcelType, setParcelType] = useState("package");
  const [weight, setWeight] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [instructions, setInstructions] = useState("");

  function handleCreate() {
    const payload = {
      senderName,
      senderPhone,
      pickupAddress,
      recipientName,
      recipientPhone,
      deliveryAddress,
      parcelType,
      weight,
      deliveryType,
      scheduledAt,
      deliveryFee,
      instructions,
    };

    // For now just log — integration with backend can be added later
    // eslint-disable-next-line no-console
    console.log("Create Parcel Order:", payload);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <CarIcon />
            Create Parcel Order
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-green-50 text-green-600">
              <Package size={20} />
            </div>
            <div>
              <DialogTitle>Create Parcel Order</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new parcel delivery
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4 ">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="text-green-600 p-1 rounded-full bg-green-50">
                <User size={14} />
              </span>
              Sender Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground">
                  Sender Name *
                </div>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Phone Number *
                </div>
                <Input
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="+1-555-0101"
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="text-sm font-semibold">Pickup Address *</div>
              <Input
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="123 Main St, New York, NY 10001"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="text-green-600 p-1 rounded-full bg-green-50">
                <MapPin size={14} />
              </span>
              Recipient Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground">
                  Recipient Name *
                </div>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Phone Number *
                </div>
                <Input
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="+1-555-0102"
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="text-sm font-semibold">Delivery Address *</div>
              <Input
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="456 Oak Ave, New York, NY 10002"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-2 ">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="text-green-600 p-1 rounded-full bg-green-50">
                <Package size={14} />
              </span>
              Parcel Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Parcel Type *
                </div>
                <Select value={parcelType} onValueChange={setParcelType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="package">Package</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Weight (kg)</div>
                <Input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground">
                  Delivery Type *
                </div>
                <Select value={deliveryType} onValueChange={setDeliveryType}>
                  <SelectTrigger
                    className={`${
                      !deliveryType
                        ? "bg-gray-100 text-muted-foreground w-full"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select delivery type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="next-day">Next Day</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Scheduled Date/Time
                </div>
                <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">
                Delivery Fee ($) *
              </div>
              <Input
                value={deliveryFee}
                className="bg-gray-100"
                onChange={(e) => setDeliveryFee(e.target.value)}
                placeholder="45.50"
              />
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Special Instructions
              </div>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full min-h-[80px] resize-none rounded-md border bg-gray-100  px-3 py-2 text-sm"
                placeholder="Handle with care, fragile items inside..."
              />
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-4" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={handleCreate}
          >
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
