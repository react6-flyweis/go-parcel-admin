type Zone = {
  rank: number;
  name: string;
  orders: number;
  value: string;
};

const defaultZones: Zone[] = [
  { rank: 1, name: "Downtown", orders: 3450, value: "$125,400" },
  { rank: 2, name: "Midtown", orders: 2890, value: "$98,700" },
  { rank: 3, name: "Airport District", orders: 2340, value: "$89,200" },
  { rank: 4, name: "Suburban North", orders: 1980, value: "$67,500" },
];

export default function TopPerformingZones({
  zones = defaultZones,
}: {
  zones?: Zone[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Top Performing Zones
      </h3>

      <div className="mt-6 space-y-4">
        {zones.map((z) => (
          <div
            key={z.rank}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-white font-semibold">
                {z.rank}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {z.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {z.orders.toLocaleString()} orders
                </div>
              </div>
            </div>

            <div className="text-emerald-500 font-medium">{z.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
