import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const NOTIFICATIONS = [
  {
    key: "order_status",
    title: "Order Status Updates",
    description: "Notify customers about order status changes",
  },
  {
    key: "driver_assignment",
    title: "Driver Assignment",
    description: "Alert when driver is assigned to order",
  },
  {
    key: "payment_confirmations",
    title: "Payment Confirmations",
    description: "Send payment receipts and confirmations",
  },
  {
    key: "sla_breach",
    title: "SLA Breach Alerts",
    description: "Alert admins when SLA is breached",
  },
  {
    key: "support_tickets",
    title: "New Support Tickets",
    description: "Notify support team of new tickets",
  },
  {
    key: "partner_approvals",
    title: "Partner Approvals",
    description: "Alert managers of pending partner approvals",
  },
];

export default function NotificationSettings() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-muted-foreground" />

        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {n.description}
                </div>
              </div>

              <div className="flex items-center">
                <Switch defaultChecked aria-label={`toggle-${n.key}`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
