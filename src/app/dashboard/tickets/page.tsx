import {
  TicketsTable,
  PageHeader,
  TicketsStatsCards,
  TicketFilters,
  TicketData,
} from '@/features/tickets'
import { queryClient } from '@/lib/react-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

async function fetchTickets(filters: TicketFilters): Promise<TicketData> {
  const params = new URLSearchParams()

  if (filters.search) {
    params.append('search', filters.search)
  }
  if (filters.status && filters.status !== 'Todos os status') {
    params.append('status', filters.status)
  }
  if (filters.priority && filters.priority !== 'Todas as prioridades') {
    params.append('priority', filters.priority)
  }
  if (filters.responsible && filters.responsible !== 'Todos os responsáveis') {
    params.append('responsible', filters.responsible)
  }
  if (filters.page) {
    params.append('page', filters.page.toString())
  }
  if (filters.limit) {
    params.append('limit', filters.limit.toString())
  }

  const response = await fetch(`/api/tickets?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Falha ao buscar tickets')
  }

  return response.json()
}

export default async function TicketsPage(searchParams: {
  page?: string
  limit?: string
  search?: string
  status?: string
  priority?: string
  responsible?: string
}) {
  await queryClient.prefetchQuery({
    queryKey: ['tickets'],
    queryFn: () =>
      fetchTickets({
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        limit: searchParams.limit ? parseInt(searchParams.limit) : 5,
        search: searchParams.search,
        status: searchParams.status,
        priority: searchParams.priority,
        responsible: searchParams.responsible,
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
