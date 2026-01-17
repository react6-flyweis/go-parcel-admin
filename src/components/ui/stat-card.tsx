import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string | React.ReactNode;
  color?: string; // tailwind color class for the left accent bar
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  color = "bg-gray-400",
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div
          className={`h-12 rounded-md flex justify-center items-center ${color} ${
            icon ? "w-12" : "w-2"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
          {subtitle && (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
