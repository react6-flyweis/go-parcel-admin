import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    label: string;
  };
  colorClass: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  colorClass,
}: StatCardProps) {
  return (
    <div className={cn("rounded-xl p-6 text-white shadow-lg", colorClass)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          {trend && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 font-medium">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                {trend.value}
              </span>
              <span className="opacity-75">{trend.label}</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-white/20 p-3">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
