import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  User,
  MapPin,
  FileText,
  Clock,
  Zap,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Parcel Details Form Schema
const parcelDetailsSchema = z.object({
  parcelType: z.string().min(1, "Parcel type is required"),
  packageSize: z.string().min(1, "Package size is required"),
  weight: z.string().min(1, "Weight is required"),
  declaredValue: z.string(),
  packageDescription: z.string(),
  deliveryOption: z.enum(["standard", "express", "same-day", "scheduled"], {
    message: "Please select a delivery option",
  }),
});

type ParcelDetailsFormValues = z.infer<typeof parcelDetailsSchema>;

type Step = 1 | 2 | 3 | 4;

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
  icon: React.ReactNode;
}

function StepIndicator({ step, currentStep, label, icon }: StepIndicatorProps) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors",
          isActive && "bg-emerald-500 text-white",
          isCompleted && "bg-emerald-500 text-white",
          !isActive && !isCompleted && "bg-gray-200 text-gray-500"
        )}
      >
        {isCompleted ? <Check className="w-6 h-6" /> : icon}
      </div>
      <div className="text-center">
        <div
          className={cn("text-sm font-medium", isActive && "text-emerald-600")}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function CreateParcelOrder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Parcel Details Form
  const parcelForm = useForm<ParcelDetailsFormValues>({
    resolver: zodResolver(parcelDetailsSchema),
    defaultValues: {
      parcelType: "",
      packageSize: "",
      weight: "",
      declaredValue: "0.00",
      packageDescription: "",
      deliveryOption: "standard",
    },
  });

  // Sender Information
  const [senderFullName, setSenderFullName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderCompany, setSenderCompany] = useState("");
  const [pickupStreet, setPickupStreet] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [pickupInstructions, setPickupInstructions] = useState("");

  // Recipient Information
  const [recipientFullName, setRecipientFullName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientCompany, setRecipientCompany] = useState("");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryZip, setDeliveryZip] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const handleNext = async () => {
    if (currentStep === 3) {
      const isValid = await parcelForm.trigger();
      if (!isValid) return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    const parcelData = parcelForm.getValues();

    const payload = {
      sender: {
        fullName: senderFullName,
        phone: senderPhone,
        email: senderEmail,
        company: senderCompany,
        pickupAddress: {
          street: pickupStreet,
          city: pickupCity,
          state: pickupState,
          zip: pickupZip,
        },
        instructions: pickupInstructions,
      },
      recipient: {
        fullName: recipientFullName,
        phone: recipientPhone,
        email: recipientEmail,
        company: recipientCompany,
        deliveryAddress: {
          street: deliveryStreet,
          city: deliveryCity,
          state: deliveryState,
          zip: deliveryZip,
        },
        instructions: deliveryInstructions,
      },
      parcel: {
        type: parcelData.parcelType,
        packageSize: parcelData.packageSize,
        weight: parcelData.weight,
        declaredValue: parcelData.declaredValue,
        description: parcelData.packageDescription,
        deliveryOption: parcelData.deliveryOption,
      },
    };

    console.log("Creating parcel order:", payload);
    // TODO: API call to create parcel order

    // Navigate to parcels list after creation
    navigate("/parcels/all");
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          senderFullName &&
          senderPhone &&
          pickupStreet &&
          pickupCity &&
          pickupState &&
          pickupZip
        );
      case 2:
        return (
          recipientFullName &&
          recipientPhone &&
          deliveryStreet &&
          deliveryCity &&
          deliveryState &&
          deliveryZip
        );
      case 3:
        return parcelForm.formState.isValid;
      default:
        return true;
    }
  };

  const isNextDisabled = !validateStep();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Parcel Order
          </h1>
          <p className="text-muted-foreground mt-1">
            Create a new parcel delivery order
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md">
            Step {currentStep} of 4
          </span>
        </div>
      </div>

      {/* Step Indicator */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <StepIndicator
              step={1}
              currentStep={currentStep}
              label="Sender Info"
              icon={<User className="w-6 h-6" />}
            />
            <div
              className={cn(
                "flex-1 h-1 mx-2",
                currentStep > 1 ? "bg-emerald-500" : "bg-gray-200"
              )}
            />
            <StepIndicator
              step={2}
              currentStep={currentStep}
              label="Recipient Info"
              icon={<User className="w-6 h-6" />}
            />
            <div
              className={cn(
                "flex-1 h-1 mx-2",
                currentStep > 2 ? "bg-emerald-500" : "bg-gray-200"
              )}
            />
            <StepIndicator
              step={3}
              currentStep={currentStep}
              label="Parcel Details"
              icon={<Package className="w-6 h-6" />}
            />
            <div
              className={cn(
                "flex-1 h-1 mx-2",
                currentStep > 3 ? "bg-emerald-500" : "bg-gray-200"
              )}
            />
            <StepIndicator
              step={4}
              currentStep={currentStep}
              label="Review & Submit"
              icon={<FileText className="w-6 h-6" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className="">
          {/* Step 1: Sender Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b">
                <User className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Sender Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderFullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="senderFullName"
                    placeholder="John Doe"
                    value={senderFullName}
                    onChange={(e) => setSenderFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderPhone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="senderPhone"
                    placeholder="+1 (555) 123-4567"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Email Address</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderCompany">Company (Optional)</Label>
                  <Input
                    id="senderCompany"
                    placeholder="Company Name"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="pickupStreet">
                  Pickup Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pickupStreet"
                  placeholder="123 Main Street, Apt 4B"
                  value={pickupStreet}
                  onChange={(e) => setPickupStreet(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="City"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="State"
                      value={pickupState}
                      onChange={(e) => setPickupState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="ZIP Code"
                      value={pickupZip}
                      onChange={(e) => setPickupZip(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupInstructions">
                  Special Pickup Instructions
                </Label>
                <Textarea
                  id="pickupInstructions"
                  placeholder="e.g., Ring doorbell, gate code 1234"
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Recipient Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Recipient Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientFullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="recipientFullName"
                    placeholder="Jane Smith"
                    value={recipientFullName}
                    onChange={(e) => setRecipientFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientPhone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="recipientPhone"
                    placeholder="+1 (555) 987-6543"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Email Address</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="jane@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientCompany">Company (Optional)</Label>
                  <Input
                    id="recipientCompany"
                    placeholder="Company Name"
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="deliveryStreet">
                  Delivery Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deliveryStreet"
                  placeholder="456 Oak Avenue, Suite 200"
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="City"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="State"
                      value={deliveryState}
                      onChange={(e) => setDeliveryState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="ZIP Code"
                      value={deliveryZip}
                      onChange={(e) => setDeliveryZip(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryInstructions">
                  Special Delivery Instructions
                </Label>
                <Textarea
                  id="deliveryInstructions"
                  placeholder="e.g., Leave at front desk, business hours only"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Parcel Details */}
          {currentStep === 3 && (
            <Form {...parcelForm}>
              <form className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Parcel Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={parcelForm.control}
                    name="parcelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Parcel Type <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select parcel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="package">Package</SelectItem>
                            <SelectItem value="envelope">Envelope</SelectItem>
                            <SelectItem value="box">Box</SelectItem>
                            <SelectItem value="fragile">
                              Fragile Item
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={parcelForm.control}
                    name="packageSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Package Size <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">
                              Small (upto 4 lbs)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (5-15 lbs)
                            </SelectItem>
                            <SelectItem value="large">
                              Large (16-50 lbs)
                            </SelectItem>
                            <SelectItem value="extra-large">
                              Extra Large (51+ lbs)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={parcelForm.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Weight (lbs) <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={parcelForm.control}
                    name="declaredValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Declared Value ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={parcelForm.control}
                  name="packageDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the contents..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Options */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Delivery Options</h3>
                  </div>

                  <FormField
                    control={parcelForm.control}
                    name="deliveryOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Standard */}
                            <div
                              onClick={() => field.onChange("standard")}
                              className={cn(
                                "relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-emerald-500",
                                field.value === "standard"
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Package className="w-5 h-5 text-emerald-600" />
                                  <h4 className="font-semibold">Standard</h4>
                                </div>
                                <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">
                                  $8.99
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Regular delivery
                              </p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>2-3 hours</span>
                              </div>
                            </div>

                            {/* Express */}
                            <div
                              onClick={() => field.onChange("express")}
                              className={cn(
                                "relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-emerald-500",
                                field.value === "express"
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-emerald-600" />
                                  <h4 className="font-semibold">Express</h4>
                                </div>
                                <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">
                                  $15.99
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Fast delivery
                              </p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>1 hour</span>
                              </div>
                            </div>

                            {/* Same Day */}
                            <div
                              onClick={() => field.onChange("same-day")}
                              className={cn(
                                "relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-emerald-500",
                                field.value === "same-day"
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Package className="w-5 h-5 text-emerald-600" />
                                  <h4 className="font-semibold">Same Day</h4>
                                </div>
                                <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">
                                  $12.49
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Delivered today
                              </p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>4-6 hours</span>
                              </div>
                            </div>

                            {/* Scheduled */}
                            <div
                              onClick={() => field.onChange("scheduled")}
                              className={cn(
                                "relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-emerald-500",
                                field.value === "scheduled"
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-5 h-5 text-emerald-600" />
                                  <h4 className="font-semibold">Scheduled</h4>
                                </div>
                                <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">
                                  $18.99
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Pick your time
                              </p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>Custom</span>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Review & Submit</h2>
              </div>

              <div className="space-y-6">
                {/* Sender Summary */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-semibold">Sender Information</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                      className="ml-auto text-emerald-600 hover:text-emerald-700"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      {senderFullName}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {senderPhone}
                    </div>
                    {senderEmail && (
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {senderEmail}
                      </div>
                    )}
                    {senderCompany && (
                      <div>
                        <span className="text-muted-foreground">Company:</span>{" "}
                        {senderCompany}
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Pickup:</span>{" "}
                      {pickupStreet}, {pickupCity}, {pickupState} {pickupZip}
                    </div>
                  </div>
                </div>

                {/* Recipient Summary */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-semibold">Recipient Information</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(2)}
                      className="ml-auto text-emerald-600 hover:text-emerald-700"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      {recipientFullName}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {recipientPhone}
                    </div>
                    {recipientEmail && (
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {recipientEmail}
                      </div>
                    )}
                    {recipientCompany && (
                      <div>
                        <span className="text-muted-foreground">Company:</span>{" "}
                        {recipientCompany}
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Delivery:</span>{" "}
                      {deliveryStreet}, {deliveryCity}, {deliveryState}{" "}
                      {deliveryZip}
                    </div>
                  </div>
                </div>

                {/* Parcel Summary */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-semibold">Parcel Details</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(3)}
                      className="ml-auto text-emerald-600 hover:text-emerald-700"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>{" "}
                      {parcelForm.getValues("parcelType")}
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Package Size:
                      </span>{" "}
                      {parcelForm.getValues("packageSize")}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight:</span>{" "}
                      {parcelForm.getValues("weight")} lbs
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Delivery Option:
                      </span>{" "}
                      {parcelForm.getValues("deliveryOption")}
                    </div>
                    {parcelForm.getValues("declaredValue") && (
                      <div>
                        <span className="text-muted-foreground">
                          Declared Value:
                        </span>{" "}
                        ${parcelForm.getValues("declaredValue")}
                      </div>
                    )}
                    {parcelForm.getValues("packageDescription") && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">
                          Description:
                        </span>{" "}
                        {parcelForm.getValues("packageDescription")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Link to="/parcels/all">
            <Button variant="ghost">Cancel</Button>
          </Link>

          {currentStep < 4 ? (
            <Button onClick={handleNext} disabled={isNextDisabled}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Check className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
