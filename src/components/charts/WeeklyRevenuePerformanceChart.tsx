import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; revenue: number };

const data: DataPoint[] = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 15000 },
  { day: "Wed", revenue: 17000 },
  { day: "Thu", revenue: 16000 },
  { day: "Fri", revenue: 18000 },
  { day: "Sat", revenue: 11000 },
  { day: "Sun", revenue: 9000 },
];

interface Props {
  height?: number;
}

export default function WeeklyRevenuePerformanceChart({ height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
