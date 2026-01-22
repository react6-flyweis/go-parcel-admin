const ORDERS = [
  {
    id: "ORD-2024-1234",
    type: "Parcel",
    customer: "John Doe",
    driver: "Mike Johnson",
    status: "In Transit",
    value: "$45.50",
    time: "10 min",
  },
  {
    id: "RID-2024-5678",
    type: "Ride",
    customer: "Sarah Smith",
    driver: "Emily Davis",
    status: "Completed",
    value: "$28.00",
    time: "15 min",
  },
  {
    id: "ORD-2024-1235",
    type: "Parcel",
    customer: "Alex Chen",
    driver: "Robert Lee",
    status: "Pickup",
    value: "$67.25",
    time: "20 min",
  },
  {
    id: "ORD-2024-1236",
    type: "NEMT",
    customer: "Mary Johnson",
    driver: "David Kim",
    status: "In Transit",
    value: "$125.00",
    time: "25 min",
  },
  {
    id: "RID-2024-5679",
    type: "Ride",
    customer: "Tom Wilson",
    driver: "Lisa Park",
    status: "Assigned",
    value: "$32.50",
    time: "30 min",
  },
];

const STATUS_COLOR_MAP: Record<string, string> = {
  Completed: "bg-green-500 text-white",
  "In Transit": "bg-gray-500 text-white",
  Pickup: "bg-gray-500 text-white",
  Assigned: "bg-gray-500 text-white",
};

function StatusPill({ status }: { status: string }) {
  const base = "rounded-md px-3 py-1 text-xs font-medium";
  const color = STATUS_COLOR_MAP[status] ?? "bg-gray-200 text-gray-700";

  return <span className={`${base} ${color}`}>{status}</span>;
}

function TypePill({ type }: { type: string }) {
  return (
    <span className="inline-block rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-600">
      {type}
    </span>
  );
}

export function RecentOrders() {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <a className="text-sm text-emerald-500" href="#">
          View All →
        </a>
      </div>

      <div className="mt-4 overflow-auto">
        <table className="w-full table-auto border-collapse border rounded-md">
          <thead>
            <tr className="bg-[#155fa7]">
              <th className="py-3 px-4 text-left text-sm text-white rounded-tl-md">
                Order ID
              </th>
              <th className="py-3 px-4 text-left text-sm text-white">Type</th>
              <th className="py-3 px-4 text-left text-sm text-white">
                Customer
              </th>
              <th className="py-3 px-4 text-left text-sm text-white">Driver</th>
              <th className="py-3 px-4 text-left text-sm text-white">Status</th>
              <th className="py-3 px-4 text-left text-sm text-white">Value</th>
              <th className="py-3 px-4 text-left text-sm text-white rounded-tr-md">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {ORDERS.map((o) => (
              <tr
                key={o.id}
                className="align-top border-t border-gray-100 bg-white"
              >
                <td className="py-3 px-4 text-gray-800">{o.id}</td>
                <td className="py-3 px-4">
                  <TypePill type={o.type} />
                </td>
                <td className="py-3 px-4 text-gray-600">{o.customer}</td>
                <td className="py-3 px-4 text-gray-600">{o.driver}</td>
                <td className="py-3 px-4">
                  <StatusPill status={o.status} />
                </td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">
                  {o.value}
                </td>
                <td className="py-3 px-4 text-gray-500">{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
