import { KPIEvolutionSkeleton } from '@/features/dashboard/components/skeletons/kpi-evolution-skeleton'
import { KPISummarySkeleton } from '@/features/dashboard/components/skeletons/kpi-summary-skeleton'
import { ClientMapSkeleton } from '@/features/dashboard/components/skeletons/client-map-skeleton'
import { ImpactMapSkeleton } from '@/features/dashboard/components/skeletons/impact-map-skeleton'
import { ClientsTableSkeleton } from '@/features/dashboard/components/skeletons/clients-table-skeleton'

export default function DashboardLoading() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto p-6 mt-20">
        <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 text-white flex items-center">
          <div className="h-6 bg-slate-600 rounded animate-pulse w-32"></div>
        </div>
        <div className="container mx-auto flex flex-col justify-center">
          <div className="flex flex-col xl:flex-row justify-center gap-4 mb-8 w-full">
            <KPIEvolutionSkeleton />
            <KPISummarySkeleton />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
              <ClientMapSkeleton />
              <ImpactMapSkeleton />
            </div>

            <ClientsTableSkeleton />
          </div>
        </div>
      </main>
    </div>
  )
}
