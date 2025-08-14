import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { KPIEvolutionChart } from '@/features/dashboard/components/kpi-evolution'
import { KPISummary } from '@/features/dashboard/components/kpi-summary'
import { ClientMap } from '@/features/dashboard/components'
import { ImpactMap } from '@/features/dashboard/components/impact-map'
import { ClientsTable } from '@/features/dashboard/components/clients-table'
import { DashboardData } from '@/features/dashboard'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Nortus - Dashboard',
  description: 'Dashboard',
}

async function getDashboardData(
  searchParams: {
    search?: string
    status?: string
    type?: string
    location?: string
  } = {},
): Promise<DashboardData> {
  try {
    const params = new URLSearchParams()

    if (searchParams.search) params.append('search', searchParams.search)
    if (searchParams.status) params.append('status', searchParams.status)
    if (searchParams.type) params.append('type', searchParams.type)
    if (searchParams.location) params.append('location', searchParams.location)

    const queryString = params.toString()
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
    throw error
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    status?: string
    type?: string
    location?: string
  }
}) {
  await queryClient.prefetchQuery({
    queryKey: ['dashboard', searchParams],
    queryFn: () => getDashboardData(searchParams),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen">
        <main className="flex-1 overflow-auto p-6 mt-20">
          <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 text-white flex items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="container mx-auto flex flex-col justify-center">
            <div className="flex flex-col xl:flex-row justify-center gap-4 mb-8 w-full">
              <KPIEvolutionChart />
              <KPISummary />
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col xl:flex-row gap-4">
                <ClientMap />
                <ImpactMap />
              </div>

              <ClientsTable />
            </div>
          </div>
        </main>
      </div>
    </HydrationBoundary>
  )
}
