export function LiveMap() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
      <div className="relative flex h-full flex-col">
        <div className="flex-1 rounded-md border-2  border-gray-200 bg-linear-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-8">
          <div className="text-center">
            <svg
              className="mx-auto h-14 w-14 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#10B981"
              />
              <circle cx="12" cy="9" r="2.2" fill="white" />
            </svg>
            <div className="mt-4 text-lg font-medium text-gray-700">
              Live Tracking Map View
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
                <span>127 Parcels</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
                <span>84 Rides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-purple-600" />
                <span>23 Specialized</span>
              </div>
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="absolute bottom-0 left-0 rounded-lg bg-white p-3 shadow-md">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
              <span>Active Parcels</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
              <span>Active Rides</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-purple-600" />
              <span>Specialized Services</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
