import { MapPin, SearchIcon, Navigation, Phone, FileText } from "lucide-react";
import { useState } from "react";
import StatCard from "@/components/ui/stat-card";

type Delivery = {
  id: string;
  driver: string;
  status: string;
  eta: string;
  progress: number;
  badgeColor?: string;
};

export default function LiveParcelTracking() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );

  const deliveries: Delivery[] = [
    {
      id: "PCL-1234",
      driver: "Mike Johnson",
      status: "In Transit",
      eta: "15 min",
      progress: 65,
      badgeColor: "bg-sky-100 text-sky-700",
    },
    {
      id: "PCL-1235",
      driver: "Sarah Lee",
      status: "Out for Delivery",
      eta: "8 min",
      progress: 90,
      badgeColor: "bg-orange-50 text-orange-700",
    },
    {
      id: "PCL-1236",
      driver: "Tom Wilson",
      status: "Picked Up",
      eta: "25 min",
      progress: 40,
      badgeColor: "bg-emerald-50 text-emerald-700",
    },
  ];

  function handleTrackOnMap(d: Delivery) {
    setSelectedDelivery(d);
    // scroll to map view
    document.getElementById("map-view")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Live Parcel Tracking</h1>
          <p className="mt-1 text-sm text-gray-600">
            Real-time tracking of all active parcel deliveries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600">
            <MapPin className="inline mr-2 h-4 w-4 align-text-bottom" /> View
            Map
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Being Tracked"
          value={String(127)}
          color="bg-sky-500"
        />

        <StatCard
          title="Out for Delivery"
          value={String(45)}
          color="bg-orange-400"
        />

        <StatCard
          title="In Transit"
          value={String(82)}
          color="bg-emerald-500"
        />

        <StatCard title="Avg ETA" value={`18 min`} color="bg-indigo-600" />
      </div>

      <div className="mt-6 rounded-md bg-emerald-50 p-4">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <p className="text-sm text-emerald-800">
            Live tracking active • Updates every 30 seconds
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="relative block">
          <span className="sr-only">Search parcel</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <SearchIcon />
          </span>
          <input
            className="w-full rounded-lg border bg-white py-4 pl-12 pr-4 text-sm placeholder:text-gray-400"
            placeholder="Enter tracking ID to locate parcel..."
            type="text"
          />
        </label>
      </div>

      <div
        id="map-view"
        className="mt-6 rounded-lg border border-gray-200 bg-white p-6"
      >
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <div className="rounded-full bg-gray-50 p-6">
            <MapPin className="h-10 w-10 text-gray-400" />
          </div>

          <h2 className="text-lg font-medium text-gray-700">
            Interactive Map View
          </h2>
          <p className="text-sm text-gray-500">
            Real-time visualization of all active deliveries
          </p>

          {selectedDelivery ? (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedDelivery.id} • Driver:{" "}
              {selectedDelivery.driver}
            </p>
          ) : null}

          <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600">
            <Navigation className="h-4 w-4" />
            Load Map View
          </button>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-medium">Active Deliveries</h3>

        <div className="mt-4 space-y-4">
          {deliveries.map((d) => (
            <div key={d.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="">
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <MapPin className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="font-medium">{d.id}</div>
                    <div className="text-sm text-gray-500">
                      Driver: {d.driver}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      Delivery Progress
                    </div>
                    <div className="mt-2 w-80 max-w-full">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: `${d.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs ${
                      d.badgeColor ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.status}
                  </span>
                  <div className="mt-2 text-sm text-gray-500">ETA: {d.eta}</div>
                  <div className="mt-1 text-xs text-gray-400">
                    {d.progress}%
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleTrackOnMap(d)}
                  className="flex-1 rounded-md border px-3 py-2 text-sm text-gray-600 inline-flex items-center justify-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Track on Map
                </button>

                <button className="flex-1 rounded-md border px-3 py-2 text-sm text-gray-600 inline-flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Driver
                </button>

                <button className="flex-1 rounded-md border px-3 py-2 text-sm text-gray-600 inline-flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
