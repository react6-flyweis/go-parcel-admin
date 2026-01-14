export function WeeklySummary() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Weekly Summary</h3>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Orders</span>
          <span className="text-lg font-medium text-gray-900">2,185</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Completed</span>
          <span className="text-lg font-medium text-emerald-600">2,088</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Cancelled</span>
          <span className="text-lg font-medium text-red-600">97</span>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-gray-600">Success Rate</span>
          <span className="text-lg font-medium text-gray-900">95.6%</span>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-gray-600">Avg Order Value</span>
          <span className="text-lg font-semibold text-gray-900">$54.82</span>
        </div>
      </div>
    </div>
  );
}
