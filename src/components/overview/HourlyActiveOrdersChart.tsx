import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const hourlyData = [
  { time: "6AM", orders: 40 },
  { time: "8AM", orders: 120 },
  { time: "10AM", orders: 170 },
  { time: "12PM", orders: 230 },
  { time: "2PM", orders: 200 },
  { time: "4PM", orders: 240 },
  { time: "6PM", orders: 320 },
  { time: "8PM", orders: 170 },
  { time: "10PM", orders: 90 },
];

export function HourlyActiveOrdersChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Hourly Active Orders
        </h3>
        <div className="text-sm text-gray-600">Live</div>
      </div>
      <div style={{ height: 300 }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={hourlyData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
