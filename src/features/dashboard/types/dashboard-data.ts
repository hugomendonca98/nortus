export interface DashboardData {
  kpiEvolution: {
    labels: string[]
    data: number[]
    currentMetric: string
    kpiData: Record<
      string,
      {
        name: string
        data: number[]
        color: string
      }
    >
  }
  kpiSummary: Array<{
    name: string
    value: string
    change: string
    changePercentage: number
    trend: 'up' | 'down'
    color: string
  }>
  clientMap: {
    locations: string[]
    types: string[]
    clients: Array<{
      id: number
      name: string
      email: string
      type: string
      monthlyValue: number
      status: string
      renewal: string
      region: string
      lat: number
      lng: number
    }>
    customerData: Array<{
      id: number
      name: string
      type: string
      location: [number, number]
      color: string
      icon: string
      region: string
    }>
    customerTypes: Array<{
      value: string
      label: string
    }>
    mapLocations: Array<{
      value: string
      label: string
    }>
  }
  impactMap: {
    segments: Array<{
      name: string
      value: number
      color: string
    }>
    chartSeries: number[]
    chartLabels: Array<{
      name: string
      color: string
    }>
  }
}
