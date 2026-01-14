export function CustomerInsights() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Customer Insights</h3>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Customers</span>
          <span className="text-lg font-medium text-gray-900">12,847</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">New This Week</span>
          <span className="text-lg font-medium text-emerald-600">+245</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Active Users</span>
          <span className="text-lg font-medium text-gray-900">8,392</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Retention Rate</span>
          <span className="text-lg font-medium text-gray-900">87.3%</span>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-gray-600">Avg Rating</span>
          <span className="text-lg font-medium text-gray-900">⭐ 4.7</span>
        </div>
      </div>
    </div>
  );
}
