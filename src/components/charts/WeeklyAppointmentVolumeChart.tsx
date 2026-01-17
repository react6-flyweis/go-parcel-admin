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
  { day: "Mon", trips: 12 },
  { day: "Tue", trips: 14 },
  { day: "Wed", trips: 18 },
  { day: "Thu", trips: 13 },
  { day: "Fri", trips: 22 },
  { day: "Sat", trips: 7 },
  { day: "Sun", trips: 4 },
];

interface Props {
  height?: number;
}

export default function WeeklyAppointmentVolumeChart({ height = 300 }: Props) {
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
        <Bar dataKey="trips" fill="#9b5cff" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
