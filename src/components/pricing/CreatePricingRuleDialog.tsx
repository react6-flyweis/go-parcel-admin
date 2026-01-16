import { useState } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, SaveIcon } from "lucide-react";

export type NewPricingRule = {
  name?: string;
  tag?: string;
  active?: boolean;
  base?: number;
  perMile?: number;
  perMin?: number;
  minFare?: number;
  note?: string;
  surgeMultiplier?: number;
};

export default function CreatePricingRuleDialog({
  onCreate,
}: {
  onCreate: (r: NewPricingRule) => void;
}) {
  const [open, setOpen] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [ruleType, setRuleType] = useState("");
  const [baseRate, setBaseRate] = useState<number | "">(0);
  const [minFare, setMinFare] = useState<number | "">(0);
  const [perMileRate, setPerMileRate] = useState<number | "">(0);
  const [perMinuteRate, setPerMinuteRate] = useState<number | "">(0);
  const [surgeMultiplier, setSurgeMultiplier] = useState<number | "">(1);
  const [activeRule, setActiveRule] = useState<boolean>(true);
  const [specialConditions, setSpecialConditions] = useState("");

  function resetForm() {
    setRuleName("");
    setRuleType("");
    setBaseRate(0);
    setMinFare(0);
    setPerMileRate(0);
    setPerMinuteRate(0);
    setSurgeMultiplier(1);
    setActiveRule(true);
    setSpecialConditions("");
  }

  function handleCreate() {
    const partial = {
      name: ruleName || "New Rule",
      tag: ruleType || "Custom",
      active: activeRule,
      base: Number(baseRate) || 0,
      perMile: Number(perMileRate) || 0,
      perMin: Number(perMinuteRate) || 0,
      minFare: Number(minFare) || 0,
      note: specialConditions || "",
      surgeMultiplier: Number(surgeMultiplier) || 1,
    } as NewPricingRule;

    onCreate(partial);
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Pricing Rule
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Pricing Rule</DialogTitle>
          <DialogDescription>
            Configure fare structure and pricing conditions
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Rule Name
            </label>
            <Input
              placeholder="e.g., Weekend Special"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full bg-white"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Rule Type
            </label>
            <Input
              placeholder="e.g., On-Demand, Airport"
              value={ruleType}
              onChange={(e) => setRuleType(e.target.value)}
              className="w-full bg-white"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Base Rate ($)
            </label>
            <Input
              type="number"
              value={baseRate}
              onChange={(e) =>
                setBaseRate(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full bg-white"
              step="0.01"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Minimum Fare ($)
            </label>
            <Input
              type="number"
              value={minFare}
              onChange={(e) =>
                setMinFare(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full bg-white"
              step="0.01"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Per Mile Rate ($)
            </label>
            <Input
              type="number"
              value={perMileRate}
              onChange={(e) =>
                setPerMileRate(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full bg-white"
              step="0.01"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Per Minute Rate ($)
            </label>
            <Input
              type="number"
              value={perMinuteRate}
              onChange={(e) =>
                setPerMinuteRate(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full bg-white"
              step="0.01"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Surge Multiplier (optional)
            </label>
            <Input
              type="number"
              value={surgeMultiplier}
              onChange={(e) =>
                setSurgeMultiplier(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full bg-white"
              step="0.1"
              min={0}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={activeRule}
              onCheckedChange={(v) => setActiveRule(Boolean(v))}
              aria-label="Active"
            />
            <div className="text-sm">Active</div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-muted-foreground block mb-2">
              Special Conditions (optional)
            </label>
            <Textarea
              placeholder="e.g., Applies during peak hours 7-9 AM"
              value={specialConditions}
              onChange={(e) => setSpecialConditions(e.target.value)}
              className="w-full bg-white"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button className="bg-emerald-500" onClick={handleCreate}>
            <SaveIcon />
            Create Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
