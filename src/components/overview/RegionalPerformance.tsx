interface Region {
  id: string;
  name: string;
  orders: number;
  revenue: number; // in dollars
  progress: number; // 0-100
  change: number; // percent change
}

const REGIONS: Region[] = [
  {
    id: "dt",
    name: "Downtown",
    orders: 1234,
    revenue: 67500,
    progress: 100,
    change: 12.5,
  },
  {
    id: "mt",
    name: "Midtown",
    orders: 892,
    revenue: 48900,
    progress: 68,
    change: 8.3,
  },
  {
    id: "ap",
    name: "Airport",
    orders: 678,
    revenue: 89200,
    progress: 55,
    change: 15.7,
  },
  {
    id: "sb",
    name: "Suburbs",
    orders: 456,
    revenue: 28400,
    progress: 40,
    change: -3.2,
  },
];

export function RegionalPerformance() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Regional Performance
      </h3>
      <div className="mt-4 space-y-4">
        {REGIONS.map((r) => (
          <div key={r.id} className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-emerald-50 p-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#10B981"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {r.name}
                  </div>
                  <div className="text-sm text-gray-500">{r.orders} orders</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${(r.revenue / 1000).toFixed(1)}k
                </div>
                <div
                  className={`text-sm ${
                    r.change >= 0 ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {r.change >= 0
                    ? `↗ ${Math.abs(r.change)}%`
                    : `↘ ${Math.abs(r.change)}%`}
                </div>
              </div>
            </div>

            <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-emerald-500"
                style={{ width: `${Math.max(4, r.progress)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
