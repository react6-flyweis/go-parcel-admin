import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Parcel", value: 345600 },
  { name: "Ride", value: 256800 },
  { name: "NEMT", value: 128900 },
  { name: "Specialized", value: 89700 },
  { name: "Shuttle", value: 113000 },
];

const COLORS = ["#10B981", "#3B82F6", "#0B5BFF", "#F59E0B", "#EF4444"];

export function RevenueByServiceChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Revenue by Service</h3>
      <div className="mt-4 ">
        <div className="" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Tooltip
                formatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
              />
              {/* <Legend verticalAlign="bottom" height={36} /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-10 pl-6">
          <ul className="space-y-3">
            {data.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    style={{ background: COLORS[i] }}
                    className="inline-block h-3 w-3 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{d.name}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${(d.value / 1000).toFixed(1)}k
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
