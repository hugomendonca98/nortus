'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { KPISummarySkeleton } from './skeletons'

export function KPISummary() {
  const { data, isLoading } = useDashboardData()

  if (!data && !isLoading) {
    return <KPISummarySkeleton />
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full flex-1 min-w-full xl:min-w-[440px]">
      {data?.kpiSummary.map((kpi) => (
        <Card
          key={kpi.name}
          className="bg-[#171d30] border-slate-700 rounded-2xl relative w-[100%] h-full min-h-[200px]"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300">{kpi.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 max-w-full">
            <div className="flex flex-col items-start justify-between gap-4">
              <div className="text-2xl font-bold text-white mt-8">
                {kpi.value}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm absolute bottom-6 left-4 ${
                    kpi.trend === 'up'
                      ? 'text-[#00DC04] text-shadow text-shadow-green-500'
                      : 'text-[#FF0000] text-shadow text-shadow-red-500'
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
            </div>
          </CardContent>

          {kpi.trend === 'up' && Number(kpi.changePercentage) > 10 && (
            <Image
              src="/images/trending-up.png"
              alt="arrow-up"
              width={100}
              height={100}
              className="absolute bottom-0 right-0"
            />
          )}

          {kpi.trend === 'down' && Number(kpi.changePercentage) < 0 && (
            <Image
              src="/images/trending-down.png"
              alt="arrow-down"
              width={100}
              height={100}
              className="absolute bottom-0 right-0"
            />
          )}
        </Card>
      ))}
    </div>
  )
}
