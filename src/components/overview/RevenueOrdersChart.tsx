import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000, orders: 80 },
  { day: "Tue", revenue: 14000, orders: 120 },
  { day: "Wed", revenue: 17000, orders: 150 },
  { day: "Thu", revenue: 15500, orders: 135 },
  { day: "Fri", revenue: 19000, orders: 180 },
  { day: "Sat", revenue: 24000, orders: 220 },
  { day: "Sun", revenue: 18500, orders: 160 },
];

export function RevenueOrdersChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Revenue & Orders Trend
        </h3>
        <div className="text-sm text-gray-600">7 Days</div>
      </div>
      <div style={{ height: 300 }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#059669"
              fillOpacity={1}
              fill="url(#colorRev)"
              name="Revenue ($)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#3B82F6"
              fillOpacity={0.1}
              fill="#3B82F6"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
