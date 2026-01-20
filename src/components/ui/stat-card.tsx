import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string | React.ReactNode;
  color?: string; // tailwind color class for the left accent bar
  icon?: React.ReactNode;
  iconDirection?: "left" | "right";
}

export default function StatCard({
  title,
  value,
  subtitle,
  color = "bg-gray-400",
  icon,
  iconDirection = "left",
}: StatCardProps) {
  const iconNode = (
    <div
      className={`h-12 rounded-md flex justify-center items-center ${color} ${
        icon ? "w-12" : "w-2"
      }`}
    >
      {icon}
    </div>
  );

  return (
    <Card className="py-5">
      <CardContent className="flex items-center gap-4 px-3">
        {iconDirection === "left" && iconNode}

        <div className="flex-1">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-2xl ">{value}</div>
          {subtitle && (
            <div className="text-xs font-medium text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>

        {iconDirection === "right" && iconNode}
      </CardContent>
    </Card>
  );
}
