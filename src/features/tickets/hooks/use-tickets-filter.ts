'use client'

import { useQueryState } from 'nuqs'

export function useTicketsFilter() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  })
  const [status, setStatus] = useQueryState('status', {
    defaultValue: 'Todos os status',
  })
  const [priority, setPriority] = useQueryState('priority', {
    defaultValue: 'Todas as prioridades',
  })
  const [responsible, setResponsible] = useQueryState('responsible', {
    defaultValue: 'Todos os responsáveis',
  })
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
  })

  return {
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    responsible,
    setResponsible,
    page,
    setPage,
  }
}
