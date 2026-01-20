import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProcessRefundDialog({ open, onOpenChange }: Props) {
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleProcess = () => {
    // TODO: wire to backend
    console.log("Process refund", { orderId, amount, method, reason, notes });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-rose-50 text-rose-600">
              <RotateCcw size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg">Process Refund</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Order ID *</label>
            <Input
              placeholder="ORD-2024-XXXX"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Refund Amount ($) *</label>
              <Input
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Refund Method *</label>
              <Input
                placeholder="Refund Method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Reason *</label>
            <Input
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Notes</label>
            <Textarea
              placeholder="Additional details about the refund..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleProcess}
            >
              Process Refund
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
