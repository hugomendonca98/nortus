'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Ticket,
  TicketFilters,
  TicketData,
  CreateTicketData,
  UpdateTicketData,
} from '../types/ticket-data'
import { fetchTickets } from '../services/fetch-tickets'

// Funções CRUD mockadas (simulando API real)
async function createTicket(ticketData: CreateTicketData): Promise<Ticket> {
  // Simular criação de ticket
  const newTicket: Ticket = {
    id: `TK${Date.now()}`,
    ...ticketData,
    status: 'Aberto',
    createdAt: new Date().toLocaleDateString('pt-BR'),
  }

  // Simular delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return newTicket
}

async function updateTicket(
  id: string,
  ticketData: UpdateTicketData,
): Promise<Ticket> {
  // Simular atualização de ticket
  const updatedTicket: Ticket = {
    id,
    priority: ticketData.priority || 'Média',
    client: ticketData.client || '',
    email: ticketData.email || '',
    subject: ticketData.subject || '',
    status: ticketData.status || 'Aberto',
    createdAt: new Date().toLocaleDateString('pt-BR'),
    responsible: ticketData.responsible || '',
  }

  // Simular delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return updatedTicket
}

export function useTicketsData(filters: TicketFilters) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => fetchTickets(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTicket,
    onSuccess: (newTicket) => {
      // Atualizar o cache diretamente adicionando o novo ticket
      queryClient.setQueriesData(
        { queryKey: ['tickets'] },
        (oldData: TicketData | undefined) => {
          if (!oldData) return oldData

          // Adicionar o novo ticket no início da lista
          const updatedTickets = [newTicket, ...oldData.tickets]

          // Atualizar a paginação
          const totalTickets = oldData.pagination.totalTickets + 1
          const totalPages = Math.ceil(totalTickets / oldData.pagination.limit)

          return {
            ...oldData,
            tickets: updatedTickets.slice(0, oldData.pagination.limit), // Manter apenas os primeiros tickets da primeira página
            pagination: {
              ...oldData.pagination,
              totalTickets,
              totalPages,
            },
          }
        },
      )
    },
  })
}

export function useUpdateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicketData }) =>
      updateTicket(id, data),
    onSuccess: (updatedTicket) => {
      // Atualizar o cache diretamente
      queryClient.setQueriesData(
        { queryKey: ['tickets'] },
        (oldData: TicketData | undefined) => {
          if (!oldData) return oldData

          const updatedTickets = oldData.tickets.map((ticket) =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket,
          )

          return {
            ...oldData,
            tickets: updatedTickets,
          }
        },
      )
    },
  })
}
