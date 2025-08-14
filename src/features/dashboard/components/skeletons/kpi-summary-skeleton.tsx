import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function KPISummarySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full flex-1 min-w-full xl:min-w-[440px]">
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className="bg-[#171d30] border-slate-700 rounded-2xl relative w-[100%] h-full min-h-[200px]"
        >
          <CardHeader className="pb-2">
            <div className="h-4 bg-slate-600 rounded animate-pulse w-24"></div>
          </CardHeader>
          <CardContent className="pt-0 max-w-full">
            <div className="flex flex-col items-start justify-between gap-4">
              <div className="h-8 bg-slate-600 rounded animate-pulse w-32 mt-8"></div>
              <div className="flex flex-col">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-20 absolute bottom-6 left-4"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
