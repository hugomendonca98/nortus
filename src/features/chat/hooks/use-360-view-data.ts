'use client'

import { useQuery } from '@tanstack/react-query'
import { fetch360View } from '../services/fetch-360-view'

export function use360ViewData() {
  return useQuery({
    queryKey: ['360-view'],
    queryFn: fetch360View,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}
