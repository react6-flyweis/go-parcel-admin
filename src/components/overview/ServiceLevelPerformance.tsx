type Service = {
  id: string;
  name: string;
  percent: number;
  color?: string;
};

const defaultServices: Service[] = [
  {
    id: "same_day",
    name: "Same-Day Delivery",
    percent: 96.5,
    color: "#34D399",
  },
  { id: "on_demand", name: "On-Demand Rides", percent: 94.2, color: "#3B82F6" },
  { id: "airport", name: "Airport Transfers", percent: 98.1, color: "#0B3A8A" },
  { id: "nemt", name: "NEMT Services", percent: 99.3, color: "#10B981" },
];

export default function ServiceLevelPerformance({
  services = defaultServices,
}: {
  services?: Service[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Service Level Performance
      </h3>

      <div className="mt-6 space-y-6">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-800">{s.name}</div>
                <div className="text-sm text-gray-700">
                  {s.percent.toFixed(1)}%
                </div>
              </div>

              <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${s.percent}%`,
                    backgroundColor: s.color || "#34D399",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
