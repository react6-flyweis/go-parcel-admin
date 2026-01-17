import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; trips: number };

const data: DataPoint[] = [
  { day: "Mon", trips: 45 },
  { day: "Tue", trips: 52 },
  { day: "Wed", trips: 48 },
  { day: "Thu", trips: 61 },
  { day: "Fri", trips: 55 },
  { day: "Sat", trips: 38 },
  { day: "Sun", trips: 30 },
];

interface Props {
  height?: number;
}

export default function WeeklyTripsChartShuttle({ height = 300 }: Props) {
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
        <Bar dataKey="trips" fill="#06b6d4" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
