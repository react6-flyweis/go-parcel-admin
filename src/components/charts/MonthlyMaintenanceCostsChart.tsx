import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = { month: string; cost: number };

const data: DataPoint[] = [
  { month: "Aug", cost: 4200 },
  { month: "Sep", cost: 5100 },
  { month: "Oct", cost: 3800 },
  { month: "Nov", cost: 7200 },
  { month: "Dec", cost: 6600 },
  { month: "Jan", cost: 5400 },
];

interface Props {
  height?: number;
}

export default function MonthlyMaintenanceCostsChart({ height = 280 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
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
          dataKey="cost"
          stroke="#FB923C"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
