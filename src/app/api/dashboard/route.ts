import { NextResponse } from 'next/server'

// Dados mockados para simular uma API real
const dashboardData = {
  kpiEvolution: {
    labels: [
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
    data: [120, 150, 180, 200, 220, 190, 250, 280, 300, 320, 350, 380],
    currentMetric: 'ARPU',
    kpiData: {
      Retenção: {
        name: 'Retenção',
        data: [120, 132, 151, 134, 190, 230, 180, 220, 270, 250, 280, 300],
        color: '#43d2cb',
      },
      Conversão: {
        name: 'Conversão',
        data: [80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245],
        color: '#43d2cb',
      },
      Churn: {
        name: 'Churn',
        data: [45, 52, 38, 65, 42, 55, 48, 62, 35, 58, 45, 40],
        color: '#43d2cb',
      },
      ARPU: {
        name: 'ARPU',
        data: [95, 105, 125, 145, 190, 185, 95, 140, 180, 220, 280, 320],
        color: '#43d2cb',
      },
    },
  },
  kpiSummary: [
    {
      name: 'ARPU',
      value: 'R$ 320,50',
      change: '+12% no período',
      changePercentage: 12,
      trend: 'up',
      color: 'blue',
    },
    {
      name: 'Conversão IA',
      value: '68,5%',
      change: '+8,2% no período',
      changePercentage: 8.2,
      trend: 'up',
      color: 'blue',
    },
    {
      name: 'Retenção',
      value: '85%',
      change: '+2,5% no período',
      changePercentage: 2.5,
      trend: 'up',
      color: 'green',
    },
    {
      name: 'Taxa de Churn',
      value: '3,2%',
      change: '-1,5% no período',
      changePercentage: -1.5,
      trend: 'down',
      color: 'red',
    },
  ],
  clientMap: {
    locations: [
      'Todos os locais',
      'São Paulo',
      'Rio de Janeiro',
      'Brasília',
      'Pernambuco',
      'Mato Grosso',
      'Paraíba',
    ],
    types: [
      'Todos os tipos',
      'Automóvel',
      'Residencial',
      'Viagem',
      'Combo resi + auto',
      'Profissional',
    ],
    clients: [
      {
        id: 1,
        name: 'Ricardo Leite',
        email: 'ricardo@email.com',
        type: 'Seguro automóvel',
        monthlyValue: 185.9,
        status: 'Ativo',
        renewal: '14/12/2024',
        region: 'São Paulo',
        lat: -23.5505,
        lng: -46.6333,
      },
      {
        id: 2,
        name: 'Maria Silva',
        email: 'maria@email.com',
        type: 'Seguro residencial',
        monthlyValue: 89.9,
        status: 'Ativo',
        renewal: '14/12/2024',
        region: 'Rio de Janeiro',
        lat: -22.9068,
        lng: -43.1729,
      },
      {
        id: 3,
        name: 'João Santos',
        email: 'joao@email.com',
        type: 'Seguro viagem',
        monthlyValue: 230.0,
        status: 'Pendente',
        renewal: '14/12/2024',
        region: 'Brasília',
        lat: -15.7942,
        lng: -47.8822,
      },
      {
        id: 4,
        name: 'Ana Costa',
        email: 'ana@email.com',
        type: 'Combo automóvel e residencial',
        monthlyValue: 260.0,
        status: 'Ativo',
        renewal: '14/12/2024',
        region: 'Pernambuco',
        lat: -8.0476,
        lng: -34.877,
      },
      {
        id: 5,
        name: 'Carlos Lima',
        email: 'carlos@email.com',
        type: 'Seguro automóvel',
        monthlyValue: 195.0,
        status: 'Ativo',
        renewal: '14/12/2024',
        region: 'Mato Grosso',
        lat: -15.601,
        lng: -56.0974,
      },
      {
        id: 6,
        name: 'Fernanda Rocha',
        email: 'fernanda@email.com',
        type: 'Seguro residencial',
        monthlyValue: 95.0,
        status: 'Pendente',
        renewal: '14/12/2024',
        region: 'Paraíba',
        lat: -7.115,
        lng: -34.8631,
      },
    ],
    // Dados para o mapa de clientes
    customerData: [
      {
        id: 1,
        name: 'Cliente A',
        type: 'premium',
        location: [-46.6333, -23.5505],
        color: '#3b82f6',
        icon: 'crown',
        region: 'centro',
      },
      {
        id: 2,
        name: 'Cliente B',
        type: 'standard',
        location: [-46.65, -23.54],
        color: '#ef4444',
        icon: 'car',
        region: 'zona-sul',
      },
      {
        id: 3,
        name: 'Cliente C',
        type: 'vip',
        location: [-46.62, -23.56],
        color: '#0882A7',
        icon: 'house',
        region: 'zona-norte',
      },
      {
        id: 4,
        name: 'Cliente D',
        type: 'premium',
        location: [-46.64, -23.53],
        color: '#3b82f6',
        icon: 'crown',
        region: 'zona-oeste',
      },
      {
        id: 5,
        name: 'Cliente E',
        type: 'basic',
        location: [-46.66, -23.57],
        color: '#70992B',
        icon: 'beach',
        region: 'zona-sul',
      },
      {
        id: 6,
        name: 'Cliente F',
        type: 'standard',
        location: [-46.61, -23.545],
        color: '#ef4444',
        icon: 'car',
        region: 'zona-leste',
      },
      {
        id: 7,
        name: 'Cliente G',
        type: 'vip',
        location: [-46.635, -23.555],
        color: '#0882A7',
        icon: 'house',
        region: 'centro',
      },
      {
        id: 8,
        name: 'Cliente H',
        type: 'premium',
        location: [-46.645, -23.565],
        color: '#3b82f6',
        icon: 'crown',
        region: 'zona-norte',
      },
      {
        id: 9,
        name: 'Cliente I',
        type: 'basic',
        location: [-46.625, -23.535],
        color: '#70992B',
        icon: 'beach',
        region: 'zona-oeste',
      },
      {
        id: 10,
        name: 'Cliente J',
        type: 'standard',
        location: [-46.655, -23.55],
        color: '#ef4444',
        icon: 'car',
        region: 'zona-leste',
      },
    ],
    customerTypes: [
      { value: 'all', label: 'Todos os tipos' },
      { value: 'premium', label: 'Premium' },
      { value: 'vip', label: 'VIP' },
      { value: 'standard', label: 'Standard' },
      { value: 'basic', label: 'Básico' },
    ],
    mapLocations: [
      { value: 'all', label: 'Todos os locais' },
      { value: 'centro', label: 'Centro' },
      { value: 'zona-sul', label: 'Zona Sul' },
      { value: 'zona-norte', label: 'Zona Norte' },
      { value: 'zona-oeste', label: 'Zona Oeste' },
      { value: 'zona-leste', label: 'Zona Leste' },
    ],
  },
  impactMap: {
    segments: [
      { name: 'Automóvel', value: 35, color: '#3B82F6' },
      { name: 'Residencial', value: 25, color: '#06B6D4' },
      { name: 'Viagem', value: 20, color: '#0EA5E9' },
      { name: 'Combo resi + auto', value: 15, color: '#0284C7' },
      { name: 'Profissional', value: 5, color: '#0369A1' },
    ],
    // Dados para o gráfico de impacto
    chartSeries: [25, 30, 20, 15, 10],
    chartLabels: [
      {
        name: 'Automóvel',
        color: '#006eff',
      },
      {
        name: 'Residencial',
        color: '#0882a7',
      },
      {
        name: 'Viagem',
        color: '#75dfff',
      },
      {
        name: 'Combo resi + auto',
        color: '#00449e',
      },
      {
        name: 'Profissional',
        color: '#53a9fd',
      },
    ],
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extrair parâmetros de filtro
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const type = searchParams.get('type') || ''
  const location = searchParams.get('location') || ''

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Aplicar filtros aos clientes
  let filteredClients = [...dashboardData.clientMap.clients]

  const filters = [
    {
      condition: search,
      filter: (client: any) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()),
    },
    {
      condition: status && status !== 'Todos os status',
      filter: (client: any) => client.status === status,
    },
    {
      condition: type && type !== 'Todos os tipos',
      filter: (client: any) => client.type === type,
    },
    {
      condition: location && location !== 'Todos os locais',
      filter: (client: any) => client.region === location,
    },
  ]

  filters.forEach(({ condition, filter }) => {
    if (condition) {
      filteredClients = filteredClients.filter(filter)
    }
  })

  // Retornar dados filtrados
  const filteredData = {
    ...dashboardData,
    clientMap: {
      ...dashboardData.clientMap,
      clients: filteredClients,
    },
  }

  return NextResponse.json(filteredData)
}
