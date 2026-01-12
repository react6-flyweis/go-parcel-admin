import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <h4 className="mt-1 text-2xl font-bold text-gray-900">{value}</h4>
        </div>
        <div className={`rounded-lg ${iconColor} p-3`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
