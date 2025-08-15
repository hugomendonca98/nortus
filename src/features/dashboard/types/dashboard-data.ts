export interface DashboardData {
  kpisTrend: {
    labels: string[]
    arpuTrend: {
      name: string
      data: number[]
    }
    conversionTrend: {
      name: string
      data: number[]
    }
    churnTrend: {
      name: string
      data: number[]
    }
    retentionTrend: {
      name: string
      data: number[]
    }
  }
  kpisResume: {
    arpu: {
      valor: number
      variacao: number
    }
    conversion: {
      valor: number
      variacao: number
    }
    retention: {
      valor: number
      variacao: number
    }
    churn: {
      valor: number
      variacao: number
    }
  }
  segments: Array<{
    nome: string
    valor: number
  }>
  activeClients: {
    filters: {
      status: string[]
      secureType: string[]
      locations: string[]
    }
    data: Array<{
      id: string
      name: string
      email: string
      secureType: string
      monthValue: number
      status: string
      renewalDate: string
      location: string
    }>
  }
  mapData: {
    center: [number, number]
    zoom: number
    locations: Array<{
      id: string
      name: string
      description: string
      coordinates: [number, number]
      category: string
      address: string
      icon: string
      color: string
    }>
  }
}
