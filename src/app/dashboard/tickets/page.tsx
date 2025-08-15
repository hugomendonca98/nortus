import { isAuth } from '@/features/auth/actions/is-auth'
import { TicketsTable, PageHeader, TicketsStatsCards } from '@/features/tickets'
import { fetchTickets } from '@/features/tickets/services/fetch-tickets'
import { queryClient } from '@/lib/react-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Nortus - Tickets',
  description: 'Tickets',
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const token = await isAuth()

  if (!token) {
    redirect('/')
  }

  const params = await searchParams

  await queryClient.prefetchQuery({
    queryKey: ['tickets'],
    queryFn: () =>
      fetchTickets({
        page: params.page ? parseInt(params.page as string) : 1,
        limit: params.limit ? parseInt(params.limit as string) : 5,
        search: params.search as string,
        status: params.status as string,
        priority: params.priority as string,
        responsible: params.responsible as string,
      }),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen">
        <PageHeader />
        <main className="flex-1 overflow-auto p-6 mt-20">
          <div className="container mx-auto flex flex-col justify-center">
            <TicketsStatsCards />

            <TicketsTable />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  )
}
