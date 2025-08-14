import { useEffect, useState } from 'react'
import { CustomerData, MapFilters } from '../types'

export function useMapFilters(
  data: any,
  initialFilters: MapFilters = { location: 'all', type: 'all' },
) {
  const [filters, setFilters] = useState<MapFilters>(initialFilters)
  const [filteredData, setFilteredData] = useState<CustomerData[]>([])

  // Filter data based on selected filters
  useEffect(() => {
    if (!data) return

    let filtered = data.clientMap.customerData

    if (filters.type !== 'all') {
      filtered = filtered.filter(
        (customer: CustomerData) => customer.type === filters.type,
      )
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(
        (customer: CustomerData) => customer.region === filters.location,
      )
    }

    setFilteredData(filtered)
  }, [filters, data])

  const updateFilters = (newFilters: MapFilters) => {
    setFilters(newFilters)
  }

  return {
    filters,
    filteredData,
    updateFilters,
  }
}
