import { useEffect, useState } from 'react'
import { CustomerData, MapFilters } from '../types'

type MapData = {
  mapData: {
    locations: {
      name: string
      category: string
      coordinates: [number, number]
      color: string
      icon: string
    }[]
  }
}

export function useMapFilters(
  data: any,
  initialFilters: MapFilters = { location: 'all', type: 'all' },
) {
  const [filters, setFilters] = useState<MapFilters>(initialFilters)
  const [filteredData, setFilteredData] = useState<CustomerData[]>([])

  // Filter data based on selected filters
  useEffect(() => {
    if (!data?.mapData) return

    // Converter os dados da API externa para o formato esperado pelo mapa
    const convertedData: CustomerData[] = data.mapData.locations.map(
      (location: MapData['mapData']['locations'][number], index: number) => ({
        id: index + 1,
        name: location.name,
        type: location.category,
        location: location.coordinates,
        color: location.color,
        icon: location.icon,
        region: location.category,
      }),
    )

    let filtered = convertedData

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
