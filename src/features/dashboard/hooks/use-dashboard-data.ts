import { useQuery } from '@tanstack/react-query'
import { DashboardData } from '../types/dashboard-data'

interface DashboardFilters {
  search?: string
  status?: string
  type?: string
  location?: string
}

async function fetchDashboardData(filters: DashboardFilters = {}): Promise<DashboardData> {
  const params = new URLSearchParams()
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value)
  })
  
  const queryString = params.toString()
  const url = `/api/dashboard${queryString ? `?${queryString}` : ''}`
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }
  return response.json()
}

export function useDashboardData(filters: DashboardFilters = {}) {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => fetchDashboardData(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}
