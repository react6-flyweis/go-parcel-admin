import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { day: string; earnings: number };

const data: DataPoint[] = [
  { day: "Mon", earnings: 9000 },
  { day: "Tue", earnings: 9500 },
  { day: "Wed", earnings: 11000 },
  { day: "Thu", earnings: 9000 },
  { day: "Fri", earnings: 12000 },
  { day: "Sat", earnings: 8000 },
  { day: "Sun", earnings: 6000 },
];

interface Props {
  height?: number;
}

export default function WeeklyEarningsChart({ height = 280 }: Props) {
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
          dataKey="earnings"
          stroke="#16A34A"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
