import { Button } from '@/components/ui/button'

export function KPIEvolutionSkeleton() {
  return (
    <div className="bg-[#171d30] rounded-2xl p-6 py-4 w-full xl:max-w-4xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-slate-600 rounded animate-pulse w-48"></div>

        {/* KPI Filter Buttons */}
        <div className="flex gap-2 bg-gray-600/30 rounded-full p-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 bg-slate-600 rounded-full animate-pulse w-16"
            ></div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <div className="w-full h-64 bg-slate-600 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}
