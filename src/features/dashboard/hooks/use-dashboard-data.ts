import { useQuery } from '@tanstack/react-query'
import { fetchDashboard } from '../services/fetch-dashboard'

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}
