import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";

type Slice = { key: string; name: string; value: number };

const data: Slice[] = [
  { key: "parcel", name: "Parcel", value: 345600 },
  { key: "ride", name: "Ride", value: 256800 },
  { key: "nemt", name: "NEMT", value: 128900 },
  { key: "specialized", name: "Specialized", value: 89700 },
  { key: "shuttle", name: "Shuttle", value: 113000 },
];

const config = {
  parcel: { label: "Parcel", color: "#10B981" },
  ride: { label: "Ride", color: "#0B5BFF" },
  nemt: { label: "NEMT", color: "#0B3A8A" },
  specialized: { label: "Specialized", color: "#F59E0B" },
  shuttle: { label: "Shuttle", color: "#EF4444" },
};

interface Props {
  height?: number;
  showLegend?: boolean;
}

export function RevenueByServiceChart({
  height = 320,
  showLegend = true,
}: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  const outerRadius = Math.min(120, Math.floor(height * 0.3));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Revenue by Service Type
      </h3>
      <div className="mt-4">
        <ChartContainer
          id="revenue-by-service"
          config={config}
          className="w-full"
          style={{ height }}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={outerRadius}
              fill="#8884d8"
              paddingAngle={2}
              label={(l) => `$${(l.value / 1000).toFixed(1)}k`}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={Boolean(active)}
                  payload={payload}
                  hideLabel={false}
                />
              )}
            />
          </PieChart>
        </ChartContainer>
      </div>
      {showLegend && (
        <div className="px-6">
          <div className="flex flex-col gap-3">
            {data.map((entry) => {
              const pct = Math.round((entry.value / total) * 100);
              const color = config[entry.key as keyof typeof config].color;
              return (
                <div
                  key={entry.key}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ background: color }}
                      className="w-3 h-3 rounded-full inline-block"
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>

                  <div className="text-sm font-medium">
                    {pct}% • ${(entry.value / 1000).toFixed(1)}k
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
