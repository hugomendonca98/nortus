import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { KPIEvolutionChart } from '@/features/dashboard/components/kpi-evolution'
import { KPISummary } from '@/features/dashboard/components/kpi-summary'
import { ClientMap } from '@/features/dashboard/components'
import { ImpactMap } from '@/features/dashboard/components/impact-map'
import { ClientsTable } from '@/features/dashboard/components/clients-table'
import { Metadata } from 'next/types'
import { isAuth } from '@/features/auth/actions/is-auth'
import { redirect } from 'next/navigation'
import { fetchDashboard } from '@/features/dashboard/services/fetch-dashboard'

export const metadata: Metadata = {
  title: 'Nortus - Dashboard',
  description: 'Dashboard',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const token = await isAuth()

  if (!token) {
    redirect('/')
  }

  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(),
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
