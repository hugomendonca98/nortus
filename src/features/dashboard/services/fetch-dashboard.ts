import { api } from '@/lib/services/api'
import { DashboardData } from '../types'

export async function fetchDashboard(): Promise<DashboardData> {
  try {
    // Buscar dados principais do dashboard
    const dashboardResponse = await api('/dash.json', {
      cache: 'no-store',
    })

    if (!dashboardResponse.ok) {
      throw new Error('Failed to fetch dashboard data')
    }

    const dashboardData = await dashboardResponse.json()

    // Buscar dados do mapa
    const mapResponse = await api('/map.json', {
      cache: 'no-store',
    })

    if (!mapResponse.ok) {
      throw new Error('Failed to fetch map data')
    }

    const mapData = await mapResponse.json()

    // Combinar os dados
    return {
      ...dashboardData,
      mapData: mapData.data,
    }
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
    throw error
  }
}
