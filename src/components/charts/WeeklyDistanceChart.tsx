import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  height?: number;
};

const data = [
  { day: "Mon", distance: 2400 },
  { day: "Tue", distance: 2600 },
  { day: "Wed", distance: 2500 },
  { day: "Thu", distance: 2900 },
  { day: "Fri", distance: 3200 },
  { day: "Sat", distance: 1800 },
  { day: "Sun", distance: 1500 },
];

export default function WeeklyDistanceChart({ height = 220 }: Props) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="distance" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
