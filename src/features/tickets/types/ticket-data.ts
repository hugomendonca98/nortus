export interface Ticket {
  id: string
  priority: 'Urgente' | 'Média' | 'Baixa'
  client: string
  email: string
  subject: string
  status: 'Aberto' | 'Em andamento' | 'Fechado'
  createdAt: string
  responsible: string
}

export interface TicketFilters {
  search?: string
  status?: string
  priority?: string
  responsible?: string
  page?: number
  limit?: number
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalTickets: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface TicketsStats {
  openTickets: number
  inProgress: number
  solved: number
  timeAverageHours: number
}

export interface TicketData {
  tickets: Ticket[]
  statuses: string[]
  priorities: string[]
  responsibles: string[]
  pagination: PaginationInfo
  stats: TicketsStats
}

export interface CreateTicketData {
  priority: 'Urgente' | 'Média' | 'Baixa'
  client: string
  email: string
  subject: string
  responsible: string
}

export interface UpdateTicketData {
  priority?: 'Urgente' | 'Média' | 'Baixa'
  client?: string
  email?: string
  subject?: string
  status?: 'Aberto' | 'Em andamento' | 'Fechado'
  responsible?: string
}

// Interface para a API externa
export interface ExternalTicketData {
  resumo: {
    open: number
    inProgress: number
    solved: number
    timeAverageHours: number
  }
  status: string[]
  priorities: string[]
  tickets: Array<{
    id: string
    priority: string
    client: string
    email: string
    subject: string
    status: string
    createdAt: string
    responsible: string
  }>
}
