import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { type MapFilters } from '../types'

interface MapFiltersProps {
  filters: MapFilters
  onFiltersChange: (filters: MapFilters) => void
  customerTypes: Array<{ value: string; label: string }>
  mapLocations: Array<{ value: string; label: string }>
}

export function MapFilters({
  filters,
  onFiltersChange,
  customerTypes,
  mapLocations,
}: MapFiltersProps) {
  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location })
  }

  const handleTypeChange = (type: string) => {
    onFiltersChange({ ...filters, type })
  }

  return (
    <div className="flex gap-4">
      <Select value={filters.location} onValueChange={handleLocationChange}>
        <SelectTrigger className="w-48 bg-[#0B1125] border-none text-white rounded-full">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent className="bg-[#0B1125] border-slate-600">
          <SelectItem value="all" className="text-white hover:bg-slate-600">
            Todas as categorias
          </SelectItem>
          {mapLocations.map((location) => (
            <SelectItem
              key={location.value}
              value={location.value}
              className="text-white hover:bg-slate-600"
            >
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-48 bg-[#0B1125] border-none text-white rounded-full">
          <SelectValue placeholder="Todos os tipos" />
        </SelectTrigger>
        <SelectContent className="bg-[#0B1125] border-slate-600">
          <SelectItem value="all" className="text-white hover:bg-slate-600">
            Todos os tipos
          </SelectItem>
          {customerTypes.map((type) => (
            <SelectItem
              key={type.value}
              value={type.value}
              className="text-white hover:bg-slate-600"
            >
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
