export interface CustomerData {
  id: number
  name: string
  type: string
  location: [number, number]
  color: string
  icon: string
  region: string
}

export interface MapFilters {
  location: string
  type: string
}
