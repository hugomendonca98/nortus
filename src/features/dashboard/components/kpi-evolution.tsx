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

  const kpiData = data?.kpiEvolution.kpiData || {}

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
      colors: [kpiData[selectedKPI].color],
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
            color: kpiData[selectedKPI].color,
            opacity: 0.8,
          },
          {
            offset: 100,
            color: kpiData[selectedKPI].color,
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
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 380,
      tickAmount: 4,
      labels: {
        style: {
          colors: '#9CA3AF',
          fontSize: '12px',
        },
        formatter: (value) => Math.round(value).toString(),
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (value) => `R$ ${value.toFixed(1)}k`,
      },
      marker: {
        show: true,
      },
    },
    legend: {
      show: false,
    },
    colors: [kpiData[selectedKPI].color],
  }

  const series = [
    {
      name: kpiData[selectedKPI].name,
      data: kpiData[selectedKPI].data,
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
          {Object.keys(kpiData).map((kpi) => (
            <Button
              key={kpi}
              onClick={() => setSelectedKPI(kpi)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedKPI === kpi
                  ? 'bg-[#37b5cc] text-white hover:bg-[#37b5cc]/80 shadow-md shadow-cyan-500/50'
                  : 'bg-[#393e4e] text-white hover:bg-[#393e4e]/80'
              }`}
            >
              {kpi}
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
