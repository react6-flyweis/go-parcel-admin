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

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function RecentOrders() {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <a className="text-sm text-emerald-500" href="#">
          View All →
        </a>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader className="bg-[#155fa7]">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-sm">
            {ORDERS.map((o) => (
              <TableRow key={o.id} className="align-top bg-white">
                <TableCell className="text-gray-800">{o.id}</TableCell>
                <TableCell>
                  <TypePill type={o.type} />
                </TableCell>
                <TableCell className="text-gray-600">{o.customer}</TableCell>
                <TableCell className="text-gray-600">{o.driver}</TableCell>
                <TableCell>
                  <StatusPill status={o.status} />
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  {o.value}
                </TableCell>
                <TableCell className="text-gray-500">{o.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
