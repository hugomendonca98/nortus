'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions } from 'apexcharts'
import { Button } from '@/components/ui/button'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { KPIEvolutionSkeleton } from './skeletons'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function KPIEvolutionChart() {
  const { data, isLoading } = useDashboardData()
  const [selectedKPI, setSelectedKPI] = useState<string>('ARPU')

  if (!data && !isLoading) {
    return <KPIEvolutionSkeleton />
  }

  // Mapear os dados da nova API para o formato esperado pelo gráfico
  const kpiOptions = [
    { key: 'ARPU', label: 'ARPU', data: data?.kpisTrend.arpuTrend.data || [] },
    {
      key: 'conversão',
      label: 'Conversão',
      data: data?.kpisTrend.conversionTrend.data || [],
    },
    {
      key: 'retenção',
      label: 'Retenção',
      data: data?.kpisTrend.retentionTrend.data || [],
    },
    {
      key: 'churn',
      label: 'Churn',
      data: data?.kpisTrend.churnTrend.data || [],
    },
  ]

  const selectedKPIData =
    kpiOptions.find((kpi) => kpi.key === selectedKPI) || kpiOptions[0]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: 'dark',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#37b5cc'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#37b5cc',
            opacity: 0.8,
          },
          {
            offset: 100,
            color: '#37b5cc',
            opacity: 0.1,
          },
        ],
      },
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: data?.kpisTrend.labels || [],
      labels: {
        style: {
          colors: '#9ca3af',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af',
        },
      },
    },
  }

  const series = [
    {
      name: selectedKPIData.label,
      data: selectedKPIData.data,
    },
  ]

  return (
    <div className="bg-[#171d30] rounded-2xl p-6 py-4 w-full xl:max-w-4xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-2xl font-semibold">
          Evolução dos KPI&apos;s
        </h2>

        {/* KPI Filter Buttons */}
        <div className="flex gap-2 bg-gray-600/30 rounded-full p-2">
          {kpiOptions.map((kpi) => (
            <Button
              key={kpi.key}
              onClick={() => setSelectedKPI(kpi.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedKPI === kpi.key
                  ? 'bg-[#37b5cc] text-white hover:bg-[#37b5cc]/80 shadow-md shadow-cyan-500/50'
                  : 'bg-[#393e4e] text-white hover:bg-[#393e4e]/80'
              }`}
            >
              {kpi.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={300}
        />
      </div>
    </div>
  )
}
