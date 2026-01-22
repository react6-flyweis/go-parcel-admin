import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const FEATURES = [
  {
    key: "realtime_tracking",
    title: "Real-time Tracking",
    desc: "Enable live GPS tracking",
    enabled: true,
  },
  {
    key: "in_app_chat",
    title: "In-App Chat",
    desc: "Customer-Driver messaging",
    enabled: true,
  },
  {
    key: "scheduled_orders",
    title: "Scheduled Orders",
    desc: "Allow future booking",
    enabled: true,
  },
  {
    key: "promo_codes",
    title: "Promo Codes",
    desc: "Discount and referral system",
    enabled: true,
  },
  {
    key: "multi_stop",
    title: "Multi-stop Orders",
    desc: "Multiple pickup/dropoff points",
    enabled: false,
  },
  {
    key: "contactless",
    title: "Contactless Delivery",
    desc: "No-contact drop-off option",
    enabled: true,
  },
];

export default function FeatureFlags() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <Flag className="h-5 w-5 text-muted-foreground" />
        <CardTitle>Feature Flags</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {FEATURES.map((f) => (
            <div
              key={f.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <div className="text-sm font-medium">{f.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {f.desc}
                </div>
              </div>

              <div className="flex items-center">
                <Switch
                  defaultChecked={f.enabled}
                  aria-label={`toggle-${f.key}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
