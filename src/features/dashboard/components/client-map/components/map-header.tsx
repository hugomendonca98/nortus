import { MapFilters } from '../types'
import { MapFilters as MapFiltersComponent } from './map-filters'

interface MapHeaderProps {
  filters: MapFilters
  onFiltersChange: (filters: MapFilters) => void
  customerTypes: Array<{ value: string; label: string }>
  mapLocations: Array<{ value: string; label: string }>
}

export function MapHeader({
  filters,
  onFiltersChange,
  customerTypes,
  mapLocations,
}: MapHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-semibold text-white mr-2">
        Mapa de clientes por região
      </h1>

      <MapFiltersComponent
        filters={filters}
        onFiltersChange={onFiltersChange}
        customerTypes={customerTypes}
        mapLocations={mapLocations}
      />
    </div>
  )
}
