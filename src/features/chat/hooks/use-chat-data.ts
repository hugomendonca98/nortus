'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchChat } from '../services/fetch-chat'

export function useChatData() {
  return useQuery({
    queryKey: ['chat'],
    queryFn: fetchChat,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}
