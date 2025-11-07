export default function Loading({
  message = "Loading...",
  subtitle = "Loading data, please wait",
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-white/70 shadow-lg backdrop-blur">
          <svg
            className="w-16 h-16 animate-spin"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        <div className="flex space-x-2 mt-3">
          <div className="w-28 h-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-20 h-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-24 h-2 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Optional small hint for accessibility */}
        <span className="sr-only">Loading data, please wait...</span>
      </div>
    </div>
  );
}
