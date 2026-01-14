import {
  Package,
  UserPlus,
  AlertTriangle,
  DollarSign,
  TicketIcon,
  Bell,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ACTIVITIES = [
  {
    id: 1,
    icon: Package,
    title: "New parcel order #ORD-1234",
    time: "2 min ago",
    bg: "bg-emerald-500",
  },
  {
    id: 2,
    icon: UserPlus,
    title: "New driver application submitted",
    time: "5 min ago",
    bg: "bg-blue-500",
  },
  {
    id: 3,
    icon: AlertTriangle,
    title: "SLA breach on order #ORD-1189",
    time: "8 min ago",
    bg: "bg-rose-500",
  },
  {
    id: 4,
    icon: DollarSign,
    title: "Payout processed: $12,450",
    time: "15 min ago",
    bg: "bg-emerald-500",
  },
  {
    id: 5,
    icon: TicketIcon,
    title: "Support ticket #TKT-892 resolved",
    time: "22 min ago",
    bg: "bg-yellow-400",
  },
];

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="icon" aria-label="notifications">
          <Bell className="h-4 w-4 text-gray-500" />
        </Button>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {ACTIVITIES.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.id} className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.bg} text-white shrink-0`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-base text-gray-800">{a.title}</div>
                  <div className="text-xs text-gray-400">{a.time}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full py-3">
          View All Activities
        </Button>
      </CardFooter>
    </Card>
  );
}
