import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatePricingRuleDialog, {
  type NewPricingRule,
} from "@/components/pricing/CreatePricingRuleDialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import { Switch } from "@/components/ui/switch";
import { MapPin, Zap, RefreshCw, DollarSign, Edit, Trash } from "lucide-react";

export default function Pricing() {
  const [distance, setDistance] = useState<number | "">(0);
  const [duration, setDuration] = useState<number | "">(0);
  const [rideType, setRideType] = useState<string>("standard");
  const [estimate, setEstimate] = useState<number>(0);

  function formatCurrency(v: number) {
    return `$${v.toFixed(2)}`;
  }

  function calculateFare() {
    const d = Number(distance) || 0;
    const m = Number(duration) || 0;
    const base = 4.5; // base fare
    const perMile = 1.6; // per mile
    const perMin = 0.45; // per minute
    let fare = base + d * perMile + m * perMin;
    if (rideType === "premium") fare *= 1.5;
    if (rideType === "shared") fare *= 0.85;
    setEstimate(fare);
  }

  const stats = [
    {
      label: "Active Rules",
      value: "5",
      color: "bg-emerald-500",
      icon: <MapPin className="h-5 w-5 text-white" />,
    },
    {
      label: "Avg Fare",
      value: "$24.50",
      color: "bg-emerald-500",
      icon: <DollarSign className="h-5 w-5 text-white" />,
    },
    {
      label: "Surge Active",
      value: "Yes",
      color: "bg-orange-500",
      icon: <Zap className="h-5 w-5 text-white" />,
    },
    {
      label: "Last Updated",
      value: "2h ago",
      color: "bg-sky-500",
      icon: <RefreshCw className="h-5 w-5 text-white" />,
    },
  ];

  const [pricingRules, setPricingRules] = useState([
    {
      name: "Standard On-Demand",
      tag: "On-Demand",
      active: false,
      base: 3.5,
      perMile: 1.75,
      perMin: 0.35,
      minFare: 7.0,
      id: "PR-001",
      note: "",
    },
    {
      name: "Airport Transfer",
      tag: "Airport",
      active: true,
      base: 15.0,
      perMile: 2.25,
      perMin: 0.5,
      minFare: 25.0,
      id: "PR-002",
      note: "Flat rate to/from airport zones",
    },
    {
      name: "Her Drive Premium",
      tag: "Her Drive",
      active: true,
      base: 5.0,
      perMile: 2.0,
      perMin: 0.4,
      minFare: 10.0,
      id: "PR-003",
      note: "Female drivers only, safety premium",
    },
    {
      name: "Peak Hour Surge",
      tag: "Surge Pricing",
      badge: "1.5x Surge",
      active: true,
      base: 3.5,
      perMile: 1.75,
      perMin: 0.35,
      minFare: 7.0,
      id: "PR-004",
      note: "7-9 AM, 5-7 PM weekdays",
    },
    {
      name: "Night Rate",
      tag: "Time-Based",
      active: true,
      base: 4.5,
      perMile: 2.0,
      perMin: 0.45,
      minFare: 10.0,
      id: "PR-005",
      note: "10 PM - 6 AM",
    },
  ]);

  function handleCreateRule(partial: NewPricingRule) {
    const nextId = `PR-${String(pricingRules.length + 1).padStart(3, "0")}`;
    const newRule = {
      name: partial.name || "New Rule",
      tag: partial.tag || "Custom",
      active: partial.active ?? true,
      base: partial.base ?? 0,
      perMile: partial.perMile ?? 0,
      perMin: partial.perMin ?? 0,
      minFare: partial.minFare ?? 0,
      id: nextId,
      note: partial.note || "",
      surgeMultiplier: partial.surgeMultiplier ?? 1,
    };
    setPricingRules((p) => [newRule, ...p]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pricing Rules</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage fare structures, surge pricing, and special rates
          </p>
        </div>
        <div>
          <CreatePricingRuleDialog onCreate={handleCreateRule} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            title={s.label}
            value={s.value}
            color={s.color}
            icon={s.icon}
          />
        ))}
      </div>

      <Card className="bg-linear-to-b from-[#2ECC711A] to-[#2196F31A] border-gray-200/20">
        <CardHeader>
          <CardTitle>Fare Calculator</CardTitle>
          <CardDescription>
            Estimate fares quickly for testing and planning
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground block mb-2">
                Distance (miles)
              </label>
              <Input
                type="number"
                value={distance}
                onChange={(e) =>
                  setDistance(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full bg-white"
                min={0}
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-muted-foreground block mb-2">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full bg-white"
                min={0}
              />
            </div>

            <div className="w-48">
              <label className="text-sm text-muted-foreground block mb-2">
                Ride Type
              </label>
              <Select value={rideType} onValueChange={(v) => setRideType(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:ml-4">
              <Button
                className="bg-emerald-500 mt-2 md:mt-0"
                onClick={calculateFare}
              >
                <DollarSign className="h-4 w-4 mr-2" /> Calculate Fare
              </Button>
            </div>
          </div>

          <div className="rounded-md bg-white p-6">
            <div className="text-sm text-muted-foreground">Estimated Fare</div>
            <div className="text-3xl font-bold text-emerald-600 mt-2">
              {formatCurrency(estimate)}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* pricing rules */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Pricing Rules</h2>
        <div className="flex flex-col gap-4">
          {pricingRules.map((r) => (
            <Card key={r.id} className="bg-white">
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-base font-semibold">{r.name}</div>
                      <span
                        className={`ml-2 text-xs px-2 py-1 rounded ${
                          r.active
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {r.active ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-md border text-slate-800">
                        {r.tag}
                      </span>
                      {r.badge ? (
                        <span className="text-xs px-2 py-1 rounded bg-amber-500 text-white">
                          {r.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3 text-xs text-muted-foreground">
                      <div>
                        <div className="text-[11px] text-slate-500">
                          Base Rate
                        </div>
                        <div className="font-medium mt-1">
                          ${r.base.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">
                          Per Mile
                        </div>
                        <div className="font-medium mt-1">
                          ${r.perMile.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">
                          Per Minute
                        </div>
                        <div className="font-medium mt-1">
                          ${r.perMin.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">
                          Minimum Fare
                        </div>
                        <div className="font-medium mt-1">
                          ${r.minFare.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">
                          Rule ID
                        </div>
                        <div className="font-medium mt-1">{r.id}</div>
                      </div>
                    </div>

                    {r.note ? (
                      <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                        {r.note}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex  items-center gap-2">
                    <Switch
                      checked={r.active}
                      onCheckedChange={() => {}}
                      aria-label={`Toggle ${r.name}`}
                      className=""
                    />
                    <div className="flex gap-2">
                      <button
                        aria-label={`Edit ${r.name}`}
                        className="h-8 w-8 inline-flex items-center justify-center rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        aria-label={`Delete ${r.name}`}
                        className="h-8 w-8 inline-flex items-center justify-center rounded border border-slate-200 bg-white text-rose-600 hover:bg-rose-50"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
