import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

type DataPoint = {
  time: string;
  active: number;
  idle: number;
};

const data: DataPoint[] = [
  { time: "6 AM", active: 45, idle: 55 },
  { time: "9 AM", active: 110, idle: 130 },
  { time: "12 PM", active: 160, idle: 170 },
  { time: "3 PM", active: 150, idle: 160 },
  { time: "6 PM", active: 200, idle: 210 },
  { time: "9 PM", active: 110, idle: 120 },
];

const config: ChartConfig = {
  active: { label: "Active Drivers", color: "#34D399" },
  idle: { label: "Idle Drivers", color: "#E5E7EB" },
};

interface Props {
  height?: number;
}

export default function DriverUtilizationChart({ height = 320 }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Driver Utilization Throughout Day
      </h3>
      <div className="mt-4">
        <ChartContainer config={config} style={{ height, width: "100%" }}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="time"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />

            <defs>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-active)"
                  stopOpacity={0.32}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-active)"
                  stopOpacity={0.08}
                />
              </linearGradient>
              <linearGradient id="idleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-idle)"
                  stopOpacity={0.48}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-idle)"
                  stopOpacity={0.12}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="idle"
              stroke="var(--color-idle)"
              fill="url(#idleGradient)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="active"
              stroke="var(--color-active)"
              fill="url(#activeGradient)"
              strokeWidth={2}
            />

            <ChartLegend
              verticalAlign="bottom"
              align="left"
              content={<ChartLegendContent />}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
