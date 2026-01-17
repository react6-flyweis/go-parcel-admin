import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; jobs: number };

const data: DataPoint[] = [
  { day: "Mon", jobs: 8 },
  { day: "Tue", jobs: 10 },
  { day: "Wed", jobs: 12 },
  { day: "Thu", jobs: 8 },
  { day: "Fri", jobs: 15 },
  { day: "Sat", jobs: 18 },
  { day: "Sun", jobs: 6 },
];

interface Props {
  height?: number;
}

export default function WeeklyMovingJobsChart({ height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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
        <Bar dataKey="jobs" fill="#FB8C00" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
