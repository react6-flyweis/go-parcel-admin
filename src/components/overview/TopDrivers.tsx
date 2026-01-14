import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  trips: number;
  rating: number;
  earnings: number; // dollars
}

const DRIVERS: Driver[] = [
  { id: "d1", name: "Mike Johnson", trips: 45, rating: 4.9, earnings: 1250 },
  { id: "d2", name: "Sarah Wilson", trips: 38, rating: 4.8, earnings: 980 },
  { id: "d3", name: "Tom Lee", trips: 42, rating: 4.7, earnings: 1100 },
  { id: "d4", name: "Emily Davis", trips: 35, rating: 4.9, earnings: 920 },
];

export function TopDrivers() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Top Drivers</h3>
        <Link
          to="/drivers"
          className="inline-flex items-center gap-1 text-sm text-sky-600"
        >
          <Button variant="link">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-4 space-y-3 flex-1">
        {DRIVERS.map((d, idx) => (
          <div
            key={d.id}
            className="rounded-lg bg-gray-50 p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-semibold">
                #{idx + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {d.name}
                </div>
                <div className="text-xs text-gray-500">
                  {d.trips} trips • ★ {d.rating}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-emerald-600">
                ${d.earnings}
              </div>
              <div className="text-xs text-gray-400">earned</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link
          to="/drivers"
          className="w-full inline-flex items-center justify-center gap-2 rounded-md border bg-white py-2 text-sm"
        >
          View All Drivers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
