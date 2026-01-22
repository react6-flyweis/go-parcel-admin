import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart";

type DataPoint = {
  day: string;
  parcel: number;
  ride: number;
  specialized: number;
};

const data: DataPoint[] = [
  { day: "Mon", parcel: 110, ride: 95, specialized: 12 },
  { day: "Tue", parcel: 140, ride: 105, specialized: 18 },
  { day: "Wed", parcel: 165, ride: 115, specialized: 22 },
  { day: "Thu", parcel: 150, ride: 110, specialized: 24 },
  { day: "Fri", parcel: 185, ride: 125, specialized: 30 },
  { day: "Sat", parcel: 210, ride: 145, specialized: 36 },
  { day: "Sun", parcel: 172, ride: 120, specialized: 20 },
];

const config: ChartConfig = {
  parcel: { label: "Parcel", color: "#10B981" },
  ride: { label: "Ride", color: "#3B82F6" },
  specialized: { label: "Specialized", color: "#0B3A8A" },
};

interface Props {
  height?: number;
}

export default function WeeklyOrderBreakdownChart({ height = 320 }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Weekly Order Breakdown
      </h3>
      <div className="mt-4">
        <ChartContainer config={config} style={{ height, width: "100%" }}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
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

            <Bar
              dataKey="parcel"
              fill="var(--color-parcel)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="ride"
              fill="var(--color-ride)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="specialized"
              fill="var(--color-specialized)"
              radius={[6, 6, 0, 0]}
            />

            <ChartLegend
              verticalAlign="bottom"
              align="left"
              content={<ChartLegendContent />}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
