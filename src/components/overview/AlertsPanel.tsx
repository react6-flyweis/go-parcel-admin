import { AlertTriangle, TicketIcon, Users } from "lucide-react";

export function AlertsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border bg-red-50 p-6 shadow-sm flex items-center gap-6">
        <div className="rounded-lg bg-red-500 p-3 text-white">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600">SLA Breaches</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">5</div>
          <div className="mt-3 text-sm text-red-600 font-medium">
            Take Action →
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-amber-50 p-6 shadow-sm flex items-center gap-6">
        <div className="rounded-lg bg-amber-500 p-3 text-white">
          <TicketIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600">Open Tickets</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">47</div>
          <div className="mt-3 text-sm text-amber-600 font-medium">
            View Tickets →
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-sky-50 p-6 shadow-sm flex items-center gap-6">
        <div className="rounded-lg bg-sky-500 p-3 text-white">
          <Users className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600">Pending Approvals</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">23</div>
          <div className="mt-3 text-sm text-sky-600 font-medium">
            Review Now →
          </div>
        </div>
      </div>
    </div>
  );
}
