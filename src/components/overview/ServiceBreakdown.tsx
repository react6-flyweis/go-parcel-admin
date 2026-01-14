export function ServiceBreakdown() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Service Breakdown</h3>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-sm text-gray-700">Parcel</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">1,234</div>
            <div className="text-xs text-gray-500">orders</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-sky-500 inline-block" />
            <span className="text-sm text-gray-700">Ride</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">892</div>
            <div className="text-xs text-gray-500">orders</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-700 inline-block" />
            <span className="text-sm text-gray-700">NEMT</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">245</div>
            <div className="text-xs text-gray-500">orders</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
            <span className="text-sm text-gray-700">Specialized</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">156</div>
            <div className="text-xs text-gray-500">orders</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
            <span className="text-sm text-gray-700">Shuttle</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium text-gray-900">301</div>
            <div className="text-xs text-gray-500">orders</div>
          </div>
        </div>
      </div>
    </div>
  );
}
