'use client'

import { KPIEvolutionSkeleton } from './kpi-evolution-skeleton'
import { KPISummarySkeleton } from './kpi-summary-skeleton'
import { ImpactMapSkeleton } from './impact-map-skeleton'
import { ClientsTableSkeleton } from './clients-table-skeleton'
import { ClientMapSkeleton } from './client-map-skeleton'

export function LoadingDemo() {
  return (
    <div className="p-6 bg-[#0b1125] min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">
          Dashboard Loading Demo
        </h1>

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
    </div>
  )
}
