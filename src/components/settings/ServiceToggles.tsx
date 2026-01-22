import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const SERVICES = [
  { key: "same_day", title: "Same-Day Delivery", enabled: true },
  { key: "scheduled", title: "Scheduled Delivery", enabled: true },
  { key: "intercity", title: "Intercity Delivery", enabled: true },
  { key: "on_demand", title: "On-Demand Rides", enabled: true },
  { key: "airport", title: "Airport Transfers", enabled: true },
  { key: "her_drive", title: "Her Drive Service", enabled: true },
  { key: "nemt", title: "NEMT Services", enabled: true },
  { key: "notary", title: "Mobile Notary", enabled: false },
  { key: "moving", title: "Moving Services", enabled: true },
  { key: "shuttle", title: "Shuttle & Tours", enabled: true },
];

export default function ServiceToggles() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <Zap className="h-5 w-5 text-muted-foreground" />

        <CardTitle>Service Toggles</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {SERVICES.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    s.enabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                />

                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Switch
                  defaultChecked={s.enabled}
                  aria-label={`toggle-${s.key}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
