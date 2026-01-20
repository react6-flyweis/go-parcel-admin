import {
  LineChart,
  Line,
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
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
};

const data: DataPoint[] = [
  { month: "Jul", revenue: 120000, expenses: 50000, profit: 70000 },
  { month: "Aug", revenue: 140000, expenses: 55000, profit: 85000 },
  { month: "Sep", revenue: 160000, expenses: 60000, profit: 100000 },
  { month: "Oct", revenue: 180000, expenses: 62000, profit: 118000 },
  { month: "Nov", revenue: 210000, expenses: 63000, profit: 147000 },
  { month: "Dec", revenue: 240000, expenses: 65000, profit: 175000 },
];

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#10B981" },
  expenses: { label: "Expenses", color: "#FB6E2E" },
  profit: { label: "Profit", color: "#2563EB" },
};

interface Props {
  height?: number;
}

export default function RevenueProfitTrendChart({ height = 320 }: Props) {
  return (
    <ChartContainer config={config} style={{ height, width: "100%" }}>
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
          dataKey="revenue"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#FB6E2E"
          strokeWidth={3}
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#2563EB"
          strokeWidth={3}
          dot={{ r: 3 }}
        />
        <ChartLegend
          verticalAlign="bottom"
          align="left"
          iconType="wye"
          content={<ChartLegendContent />}
        />
      </LineChart>
    </ChartContainer>
  );
}
