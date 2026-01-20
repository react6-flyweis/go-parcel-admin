import PageHeader from "@/components/PageHeader";
import { MessageSquare, Zap, Star, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import LiveChatInterface from "@/components/support/LiveChatInterface";

const statCards = [
  {
    title: "Active Chats",
    value: "13",
    icon: <MessageSquare className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Avg Response Time",
    value: "44s",
    icon: <Zap className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Satisfaction Rate",
    value: "97%",
    icon: <Star className="size-6 text-white" />,
    color: "bg-orange-500",
  },
  {
    title: "Resolved Today",
    value: "47",
    icon: <CheckCircle2 className="size-6 text-white" />,
    color: "bg-blue-500",
  },
];

export default function LiveChatSupport() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Chat Support"
        subtitle="Real-time customer support conversations and instant messaging"
        Icon={<MessageSquare className="size-6" />}
        iconColor="bg-green-600"
      />

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      <LiveChatInterface />
    </div>
  );
}
