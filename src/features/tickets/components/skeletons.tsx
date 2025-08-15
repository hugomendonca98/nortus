import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function TicketsTableSkeleton() {
  return (
    <Card className="col-span-3 bg-[#171d30] border-slate-700">
      <CardHeader>
        <div className="h-6 w-32 bg-slate-600 rounded animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="h-10 flex-1 bg-slate-600 rounded-full animate-pulse" />
          <div className="h-10 w-40 bg-slate-600 rounded-full animate-pulse" />
          <div className="h-10 w-40 bg-slate-600 rounded-full animate-pulse" />
          <div className="h-10 w-40 bg-slate-600 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border border-slate-700 rounded-lg"
            >
              <div className="h-4 w-16 bg-slate-600 rounded animate-pulse" />
              <div className="h-6 w-20 bg-slate-600 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-slate-600 rounded mb-1 animate-pulse" />
                <div className="h-3 w-40 bg-slate-600 rounded animate-pulse" />
              </div>
              <div className="h-4 w-48 bg-slate-600 rounded animate-pulse" />
              <div className="h-6 w-20 bg-slate-600 rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-slate-600 rounded animate-pulse" />
              <div className="h-4 w-24 bg-slate-600 rounded animate-pulse" />
              <div className="flex space-x-2">
                <div className="h-8 w-16 bg-slate-600 rounded animate-pulse" />
                <div className="h-8 w-16 bg-slate-600 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
