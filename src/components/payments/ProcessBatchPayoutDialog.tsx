import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingCount?: number;
  totalAmount?: string;
}

export default function ProcessBatchPayoutDialog({
  open,
  onOpenChange,
  pendingCount = 23,
  totalAmount = "$45,230.00",
}: Props) {
  const [processingDate, setProcessingDate] = useState("");
  const [method, setMethod] = useState("credit");

  const handleProcess = () => {
    // TODO: hook up real processing
    console.log("Processing payouts", { processingDate, method });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg">Process Batch Payout</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5">
          <div className="rounded-md bg-blue-50 text-secondary p-4 text-sm ">
            You are about to process{" "}
            <span className="font-semibold">
              {pendingCount} pending payouts
            </span>{" "}
            totaling <span className="font-semibold">{totalAmount}</span>
          </div>

          <div>
            <label className="block text-sm mb-2">Processing Date</label>
            <Input
              placeholder="DD/MM/YYYY"
              value={processingDate}
              onChange={(e) => setProcessingDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleProcess}
            >
              Process Payouts
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
