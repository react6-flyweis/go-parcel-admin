import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; revenue: number };

const data: DataPoint[] = [
  { day: "Mon", revenue: 8000 },
  { day: "Tue", revenue: 9000 },
  { day: "Wed", revenue: 11000 },
  { day: "Thu", revenue: 10000 },
  { day: "Fri", revenue: 12000 },
  { day: "Sat", revenue: 15000 },
  { day: "Sun", revenue: 11500 },
];

interface Props {
  height?: number;
}

export default function DailyRevenueChart({ height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
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
        <Legend wrapperStyle={{ paddingTop: 8 }} />
        <Bar
          dataKey="revenue"
          name="Revenue ($)"
          fill="var(--color-green-500)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
