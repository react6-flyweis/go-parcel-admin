import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";

type Slice = { key: string; name: string; value: number };

const data: Slice[] = [
  { key: "five", name: "5 Stars", value: 45 },
  { key: "four", name: "4 Stars", value: 30 },
  { key: "three", name: "3 Stars", value: 15 },
  { key: "two", name: "2 Stars", value: 7 },
  { key: "one", name: "1 Star", value: 3 },
];

const config = {
  five: { label: "5 Stars", color: "#10B981" },
  four: { label: "4 Stars", color: "#3B82F6" },
  three: { label: "3 Stars", color: "#F59E0B" },
  two: { label: "2 Stars", color: "#F97316" },
  one: { label: "1 Star", color: "#EF4444" },
};

interface Props {
  height?: number;
}

export default function RatingDistributionChart({ height = 320 }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  const outerRadius = Math.min(120, Math.floor(height * 0.3));

  return (
    <div className="">
      <ChartContainer
        id="rating-distribution"
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
            label={(l) => l.value + " %"}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={config[entry.key as keyof typeof config].color}
              />
            ))}
          </Pie>

          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={Boolean(active)}
                payload={payload}
                hideLabel
              />
            )}
          />
        </PieChart>
      </ChartContainer>
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

                <div className="text-sm font-medium">{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
