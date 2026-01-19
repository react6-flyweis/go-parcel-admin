import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; completed: number };

const data: DataPoint[] = [
  { day: "Mon", completed: 240 },
  { day: "Tue", completed: 280 },
  { day: "Wed", completed: 300 },
  { day: "Thu", completed: 260 },
  { day: "Fri", completed: 320 },
  { day: "Sat", completed: 180 },
  { day: "Sun", completed: 120 },
];

interface Props {
  height?: number;
}

export default function WeeklyTripsCompletedChart({ height = 280 }: Props) {
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
        <Bar dataKey="completed" fill="#2B7FFF" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
