import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Calendar, User, MapPin, Package, Clock } from "lucide-react";

interface ScheduleDeliveryDialogProps {
  children?: React.ReactNode;
}

export default function ScheduleDeliveryDialog({
  children,
}: ScheduleDeliveryDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Sender Details
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  // Step 2: Receiver Details
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  // Step 3: Package Details
  const [packageType, setPackageType] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Step 4: Schedule Details
  const [scheduledDate, setScheduledDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [recurrence, setRecurrence] = useState("one-time");
  const [deliveryType, setDeliveryType] = useState("");

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const payload = {
      sender: {
        name: senderName,
        phone: senderPhone,
        address: pickupAddress,
        email: senderEmail,
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        address: deliveryAddress,
        email: receiverEmail,
      },
      package: {
        type: packageType,
        weight,
        dimensions: { length, width, height },
        instructions: specialInstructions,
      },
      schedule: { date: scheduledDate, timeSlot, recurrence, deliveryType },
    };
    console.log("Schedule Delivery:", payload);
    setOpen(false);
    setStep(1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Sender Details";
      case 2:
        return "Receiver Details";
      case 3:
        return "Package Details";
      case 4:
        return "Schedule Details";
      default:
        return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <User className="h-6 w-6 text-white" />;
      case 2:
        return <MapPin className="h-6 w-6 text-white" />;
      case 3:
        return <Package className="h-6 w-6 text-white" />;
      case 4:
        return <Clock className="h-6 w-6 text-white" />;
      default:
        return <Calendar className="h-6 w-6 text-white" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="rounded">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Delivery
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="border-b p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center">
              {getStepIcon()}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">
                Schedule New Delivery
              </DialogTitle>
              <DialogDescription className="mt-1 text-base">
                Step {step} of {totalSteps} - {getStepTitle()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-2 w-full rounded-full transition-colors ${
                    s <= step ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
                {s < totalSteps && (
                  <div
                    className={`h-3 w-3 rounded-full mx-1 ${
                      s < step ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Sender Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Sender Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter sender name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Pickup Address *</label>
                <Input
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter full pickup address"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email Address (Optional)
                </label>
                <Input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="sender@example.com"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 2: Receiver Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Receiver Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Enter receiver name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Delivery Address *
                </label>
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter full delivery address"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email Address (Optional)
                </label>
                <Input
                  type="email"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  placeholder="receiver@example.com"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 3: Package Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Package Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Package Type *</label>
                  <Select value={packageType} onValueChange={setPackageType}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="small-package">
                        Small Package
                      </SelectItem>
                      <SelectItem value="medium-package">
                        Medium Package
                      </SelectItem>
                      <SelectItem value="large-package">
                        Large Package
                      </SelectItem>
                      <SelectItem value="fragile">Fragile</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Weight (kg) *</label>
                  <Input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 2.5"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Dimensions (cm)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Length"
                  />
                  <Input
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                  />
                  <Input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special handling instructions..."
                  className="w-full mt-1 min-h-[100px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 4: Schedule Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Schedule Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Scheduled Date *
                  </label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Time Slot *</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00-11:00">
                        09:00 AM - 11:00 AM
                      </SelectItem>
                      <SelectItem value="11:00-13:00">
                        11:00 AM - 01:00 PM
                      </SelectItem>
                      <SelectItem value="13:00-15:00">
                        01:00 PM - 03:00 PM
                      </SelectItem>
                      <SelectItem value="15:00-17:00">
                        03:00 PM - 05:00 PM
                      </SelectItem>
                      <SelectItem value="17:00-19:00">
                        05:00 PM - 07:00 PM
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Recurrence *</label>
                  <Select value={recurrence} onValueChange={setRecurrence}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select recurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="daily">Daily (Mon-Fri)</SelectItem>
                      <SelectItem value="daily-all">
                        Daily (All Days)
                      </SelectItem>
                      <SelectItem value="weekly-monday">
                        Weekly (Every Monday)
                      </SelectItem>
                      <SelectItem value="weekly-tuesday">
                        Weekly (Every Tuesday)
                      </SelectItem>
                      <SelectItem value="weekly-wednesday">
                        Weekly (Every Wednesday)
                      </SelectItem>
                      <SelectItem value="weekly-thursday">
                        Weekly (Every Thursday)
                      </SelectItem>
                      <SelectItem value="weekly-friday">
                        Weekly (Every Friday)
                      </SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Delivery Type *</label>
                  <Select value={deliveryType} onValueChange={setDeliveryType}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select delivery type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">
                        Same-Day Delivery
                      </SelectItem>
                      <SelectItem value="express">Express Delivery</SelectItem>
                      <SelectItem value="standard">
                        Standard Delivery
                      </SelectItem>
                      <SelectItem value="grocery">Grocery Delivery</SelectItem>
                      <SelectItem value="food">Food Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {recurrence !== "one-time" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> This delivery will be automatically
                    scheduled according to the selected recurrence pattern until
                    you cancel it.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="border-t p-6">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setStep(1);
                }}
              >
                Cancel
              </Button>
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Schedule Delivery
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
