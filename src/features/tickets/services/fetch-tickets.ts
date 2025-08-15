import { api } from '@/lib/services/api'
import { TicketFilters, TicketData, ExternalTicketData, Ticket } from '../types'

export async function fetchTickets(
  filters: TicketFilters,
): Promise<TicketData> {
  try {
    const response = await api('/ticket-management.json', {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Falha ao buscar tickets')
    }

    const externalData: ExternalTicketData = await response.json()

    // Converter dados externos para o formato interno
    const tickets: Ticket[] = externalData.tickets.map((ticket) => ({
      id: ticket.id,
      priority: ticket.priority as 'Urgente' | 'Média' | 'Baixa',
      client: ticket.client,
      email: ticket.email,
      subject: ticket.subject,
      status: ticket.status as 'Aberto' | 'Em andamento' | 'Fechado',
      createdAt: ticket.createdAt,
      responsible: ticket.responsible,
    }))

    // Aplicar filtros localmente
    let filteredTickets = tickets

    if (filters.search) {
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          ticket.client.toLowerCase().includes(filters.search!.toLowerCase()) ||
          ticket.subject
            .toLowerCase()
            .includes(filters.search!.toLowerCase()) ||
          ticket.email.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    if (filters.status && filters.status !== 'Todos os status') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.status === filters.status,
      )
    }

    if (filters.priority && filters.priority !== 'Todas as prioridades') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.priority === filters.priority,
      )
    }

    if (
      filters.responsible &&
      filters.responsible !== 'Todos os responsáveis'
    ) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.responsible === filters.responsible,
      )
    }

    // Paginação local
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTickets = filteredTickets.slice(startIndex, endIndex)

    // Extrair responsáveis únicos
    const responsibles = [
      ...new Set(tickets.map((ticket) => ticket.responsible)),
    ]

    // Criar dados de estatísticas
    const stats = {
      openTickets: externalData.resumo.open,
      inProgress: externalData.resumo.inProgress,
      solved: externalData.resumo.solved,
      timeAverageHours: externalData.resumo.timeAverageHours,
    }

    // Criar informações de paginação
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(filteredTickets.length / limit),
      totalTickets: filteredTickets.length,
      limit,
      hasNextPage: endIndex < filteredTickets.length,
      hasPrevPage: page > 1,
    }

    return {
      tickets: paginatedTickets,
      statuses: externalData.status,
      priorities: externalData.priorities,
      responsibles,
      pagination,
      stats,
    }
  } catch (error) {
    console.error('Erro ao buscar tickets:', error)
    throw error
  }
}
