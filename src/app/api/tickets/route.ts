import { NextResponse } from 'next/server'

// Dados mockados para simular uma API real
const ticketsData = {
  tickets: [
    {
      id: 'TK001',
      priority: 'Urgente',
      client: {
        name: 'Ricardo Leite',
        email: 'ricardo@email.com',
      },
      subject: 'Solicitação de alteração',
      status: 'Aberto',
      createdAt: '14/12/2024',
      responsible: 'Ana Silva',
    },
    {
      id: 'TK002',
      priority: 'Média',
      client: {
        name: 'Maria Silva',
        email: 'mariasilva@email.com',
      },
      subject: 'Dúvida sobre cobertura',
      status: 'Aberto',
      createdAt: '13/12/2024',
      responsible: 'João Costa',
    },
    {
      id: 'TK003',
      priority: 'Baixa',
      client: {
        name: 'João Costa',
        email: 'costajoao@email.com',
      },
      subject: 'Sinistro na residência',
      status: 'Em andamento',
      createdAt: '13/12/2024',
      responsible: 'Carlos Lima',
    },
    {
      id: 'TK004',
      priority: 'Urgente',
      client: {
        name: 'Residencial Premium',
        email: 'rpremium@email.com',
      },
      subject: 'Seguro residencial',
      status: 'Aberto',
      createdAt: '12/12/2024',
      responsible: 'Anderson Freitas',
    },
    {
      id: 'TK006',
      priority: 'Média',
      client: {
        name: 'Familia Total',
        email: 'familiatotal@email.com',
      },
      subject: 'Dúvida sobre combo automóvel e residencial',
      status: 'Aberto',
      createdAt: '09/12/2024',
      responsible: 'Ana Silva',
    },
    {
      id: 'TK007',
      priority: 'Baixa',
      client: {
        name: 'Empresa ABC',
        email: 'abc@email.com',
      },
      subject: 'Renovação de contrato',
      status: 'Fechado',
      createdAt: '08/12/2024',
      responsible: 'Ana Silva',
    },
    {
      id: 'TK008',
      priority: 'Urgente',
      client: {
        name: 'João Pedro',
        email: 'joaopedro@email.com',
      },
      subject: 'Acidente de trânsito',
      status: 'Em andamento',
      createdAt: '07/12/2024',
      responsible: 'Carlos Lima',
    },
    {
      id: 'TK009',
      priority: 'Média',
      client: {
        name: 'Seguros Express',
        email: 'express@email.com',
      },
      subject: 'Consulta sobre apólice',
      status: 'Aberto',
      createdAt: '06/12/2024',
      responsible: 'João Costa',
    },
    {
      id: 'TK010',
      priority: 'Baixa',
      client: {
        name: 'Maria Oliveira',
        email: 'oliveira@email.com',
      },
      subject: 'Solicitação de documentos',
      status: 'Fechado',
      createdAt: '05/12/2024',
      responsible: 'Anderson Freitas',
    },
    {
      id: 'TK011',
      priority: 'Urgente',
      client: {
        name: 'Carlos Eduardo',
        email: 'carlosedu@email.com',
      },
      subject: 'Reclamação sobre atendimento',
      status: 'Aberto',
      createdAt: '04/12/2024',
      responsible: 'Ana Silva',
    },
    {
      id: 'TK012',
      priority: 'Média',
      client: {
        name: 'Seguros Premium',
        email: 'premium@email.com',
      },
      subject: 'Alteração de beneficiários',
      status: 'Em andamento',
      createdAt: '03/12/2024',
      responsible: 'João Costa',
    },
    {
      id: 'TK013',
      priority: 'Baixa',
      client: {
        name: 'Familia Santos',
        email: 'santos@email.com',
      },
      subject: 'Dúvida sobre cobertura adicional',
      status: 'Aberto',
      createdAt: '02/12/2024',
      responsible: 'Carlos Lima',
    },
    {
      id: 'TK014',
      priority: 'Urgente',
      client: {
        name: 'Empresa XYZ',
        email: 'xyz@email.com',
      },
      subject: 'Sinistro empresarial',
      status: 'Em andamento',
      createdAt: '01/12/2024',
      responsible: 'Anderson Freitas',
    },
    {
      id: 'TK015',
      priority: 'Média',
      client: {
        name: 'João Silva',
        email: 'joaosilva@email.com',
      },
      subject: 'Renovação de apólice',
      status: 'Aberto',
      createdAt: '30/11/2024',
      responsible: 'Ana Silva',
    },
  ],
  statuses: ['Aberto', 'Em andamento', 'Fechado', 'Cancelado'],
  priorities: ['Urgente', 'Média', 'Baixa'],
  responsibles: ['Ana Silva', 'João Costa', 'Carlos Lima', 'Anderson Freitas'],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extrair parâmetros de filtro
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const priority = searchParams.get('priority') || ''
  const responsible = searchParams.get('responsible') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '5')

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Aplicar filtros aos tickets
  let filteredTickets = [...ticketsData.tickets]

  const filters = [
    {
      condition: search,
      filter: (ticket: any) =>
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.client.name.toLowerCase().includes(search.toLowerCase()) ||
        ticket.client.email.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()),
    },
    {
      condition: status && status !== 'Todos os status',
      filter: (ticket: any) => ticket.status === status,
    },
    {
      condition: priority && priority !== 'Todas as prioridades',
      filter: (ticket: any) => ticket.priority === priority,
    },
    {
      condition: responsible && responsible !== 'Todos os responsáveis',
      filter: (ticket: any) => ticket.responsible === responsible,
    },
  ]

  filters.forEach(({ condition, filter }) => {
    if (condition) {
      filteredTickets = filteredTickets.filter(filter)
    }
  })

  // Calcular paginação
  const totalTickets = filteredTickets.length
  const totalPages = Math.ceil(totalTickets / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex)

  // Calcular estatísticas
  const allTickets = ticketsData.tickets
  const today = new Date().toLocaleDateString('pt-BR')

  const stats = {
    openTickets: allTickets.filter((ticket) => ticket.status === 'Aberto')
      .length,
    inProgress: allTickets.filter((ticket) => ticket.status === 'Em andamento')
      .length,
    resolvedToday: allTickets.filter(
      (ticket) => ticket.status === 'Fechado' && ticket.createdAt === today,
    ).length,
    averageTime: '2.5h', // Valor mockado para simplicidade
  }

  // Retornar dados filtrados e paginados
  const filteredData = {
    ...ticketsData,
    tickets: paginatedTickets,
    pagination: {
      currentPage: page,
      totalPages,
      totalTickets,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    stats,
  }

  return NextResponse.json(filteredData)
}
