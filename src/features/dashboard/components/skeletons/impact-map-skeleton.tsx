import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ImpactMapSkeleton() {
  return (
    <div className="h-full flex items-center justify-center w-full flex-1 min-w-[440px] min-h-[490px] mt-4 mb-2 xl:mt-0 xl:mb-0">
      <Card className="w-full max-w-full xl:max-w-md bg-[#171d30] border-slate-700 h-full max-h-full min-h-[490px] rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="h-6 bg-slate-600 rounded animate-pulse w-48 mx-auto"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-slate-600 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 bg-slate-600 rounded-full animate-pulse w-24"
              ></div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="h-10 bg-slate-600 rounded-lg animate-pulse w-32"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
