export function ClientMapSkeleton() {
  return (
    <div className="bg-[#171d30] rounded-2xl p-6 shadow-2xl w-full border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-slate-600 rounded animate-pulse w-48"></div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="h-10 bg-slate-600 rounded-full animate-pulse w-48"></div>
          <div className="h-10 bg-slate-600 rounded-full animate-pulse w-48"></div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="w-full h-96 bg-slate-600 rounded-xl animate-pulse"></div>
      </div>
    </div>
  )
}
