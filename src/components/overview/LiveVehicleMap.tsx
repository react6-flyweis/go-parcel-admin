export function LiveVehicleMap() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
      <div className="relative flex h-full flex-col">
        <div className="flex-1 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-12">
          <div className="text-center max-w-2xl w-full">
            <svg
              className="mx-auto h-20 w-20 text-blue-500"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 6C17.373 6 12 11.373 12 18c0 10.5 12 22 12 22s12-11.5 12-22c0-6.627-5.373-12-12-12z"
                stroke="#2563EB"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="24"
                cy="18"
                r="4"
                stroke="#2563EB"
                strokeWidth="2"
                fill="#FFFFFF"
              />
            </svg>

            <h3 className="mt-6 text-2xl font-semibold text-gray-800">
              Live Map View
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Real-time vehicle tracking on interactive map
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { id: "MA-1234", color: "bg-emerald-500" },
                { id: "MA-5678", color: "bg-yellow-400" },
                { id: "MA-9012", color: "bg-emerald-400" },
                { id: "MA-3456", color: "bg-blue-400" },
              ].map((v) => (
                <button
                  key={v.id}
                  className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md"
                >
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${v.color}`}
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {v.id}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveVehicleMap;
