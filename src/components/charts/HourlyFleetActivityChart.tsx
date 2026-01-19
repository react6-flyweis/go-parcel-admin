import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  height?: number;
};

const data = [
  { hour: "10 AM", active: 45 },
  { hour: "11 AM", active: 55 },
  { hour: "12 PM", active: 60 },
  { hour: "1 PM", active: 62 },
  { hour: "2 PM", active: 70 },
  { hour: "3 PM", active: 50 },
];

export default function HourlyFleetActivityChart({ height = 220 }: Props) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
