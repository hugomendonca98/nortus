'use client'

import { useDashboardData } from '../../hooks/use-dashboard-data'
import { ClientMapSkeleton } from '../skeletons'
import { MapHeader } from './components/map-header'
import { OlMap } from './components/ol-map'
import { useMapFilters } from './hooks/use-map-filters'

export function ClientMap() {
  const { data } = useDashboardData()
  const { filters, filteredData, updateFilters } = useMapFilters(data)

  if (!data) {
    return <ClientMapSkeleton />
  }

  // Mapear os dados da API externa para o formato esperado pelo mapa
  const mapLocations =
    data.mapData?.locations.map((location) => ({
      value: location.category,
      label:
        location.category.charAt(0).toUpperCase() + location.category.slice(1),
    })) || []

  const customerTypes =
    data.mapData?.locations.map((location) => ({
      value: location.category,
      label:
        location.category.charAt(0).toUpperCase() + location.category.slice(1),
    })) || []

  return (
    <div className="bg-[#171d30] rounded-2xl p-6 shadow-2xl w-full border border-slate-700">
      <MapHeader
        filters={filters}
        onFiltersChange={updateFilters}
        customerTypes={customerTypes}
        mapLocations={mapLocations}
      />

      <OlMap customerData={filteredData} />
    </div>
  )
}
