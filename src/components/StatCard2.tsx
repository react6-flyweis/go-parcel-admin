import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCard2Props {
  title: string;
  value: string;
  subtitle?: React.ReactNode;
  subtitleClass?: string;
  Icon?: React.ReactNode;
  className?: string;
}

export default function StatCard2({
  title,
  value,
  subtitle,
  subtitleClass,
  Icon,
  className,
}: StatCard2Props) {
  return (
    <Card className={cn("gap-0 rounded-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitleClass ? (
          <div className={subtitleClass}>{subtitle}</div>
        ) : (
          <p className="text-xs">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
