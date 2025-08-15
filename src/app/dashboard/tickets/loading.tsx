import { TicketsTableSkeleton } from '@/features/tickets/components/skeletons'
import { Card, CardContent } from '@/components/ui/card'

export default function TicketsLoading() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto p-6 mt-20">
        <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 text-white flex items-center">
          <div className="h-6 bg-slate-600 rounded animate-pulse w-32"></div>
        </div>

        <div className="container mx-auto flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                className="bg-[#171d30] border-slate-700 animate-pulse"
              >
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-600 rounded mb-2"></div>
                  <div className="h-8 bg-slate-600 rounded mb-4"></div>
                  <div className="h-8 w-8 bg-slate-600 rounded ml-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabela de tickets skeleton */}
          <TicketsTableSkeleton />
        </div>
      </main>
    </div>
  )
}
