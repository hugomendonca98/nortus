'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ApexOptions } from 'apexcharts'
import { Badge } from '@/components/ui/badge'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { ImpactMapSkeleton } from './skeletons'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ImpactMap() {
  const { data, isLoading } = useDashboardData()

  if (!data && !isLoading) {
    return <ImpactMapSkeleton />
  }

  // Mapear os dados da nova API para o formato esperado pelo gráfico
  const segments = data?.segments || []
  const chartSeries = segments.map((segment) => segment.valor)
  const chartLabels = segments.map((segment) => segment.nome)

  // Cores para os segmentos
  const colors = ['#006eff', '#75dfff', '#0882a7', '#00449e', '#53a9fd']

  const chartOptions = {
    chart: {
      type: 'donut' as const,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
        },
      },
    },
    stroke: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  return (
    <div className="h-full flex items-center justify-center w-full flex-1 min-w-[440px] min-h-[490px] mt-4 mb-2 xl:mt-0 xl:mb-0">
      <Card className="w-full max-w-full xl:max-w-md bg-[#171d30] border-slate-700 h-full max-h-full min-h-[490px] rounded-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-white text-lg font-medium">
            Mapa de impacto por segmento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Chart
                options={
                  {
                    ...chartOptions,
                    labels: chartLabels,
                  } as ApexOptions
                }
                series={chartSeries}
                type="donut"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {segments.map((segment, index) => (
              <div
                key={segment.nome}
                className="bg-[#ffffff0d] text-white border border-[#ffffff1a] p-2 px-4 rounded-full flex items-center gap-2"
              >
                <Badge
                  variant="outline"
                  className="text-white border-none rounded-full p-1"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></Badge>
                {segment.nome}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Analisar segmentos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
