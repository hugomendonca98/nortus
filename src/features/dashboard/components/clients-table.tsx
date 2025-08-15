'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { ClientsTableSkeleton } from './skeletons'
import { useCallback } from 'react'

export function ClientsTable() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  })
  const [status, setStatus] = useQueryState('status', {
    defaultValue: 'Todos',
  })
  const [type, setType] = useQueryState('type', {
    defaultValue: 'Todos',
  })
  const [location, setLocation] = useQueryState('location', {
    defaultValue: 'Todos',
  })

  const { data, isLoading } = useDashboardData()

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value || null)
    },
    [setSearch],
  )

  if (isLoading && !data) {
    return <ClientsTableSkeleton />
  }

  // Filtrar clientes baseado nos filtros selecionados
  const filteredClients =
    data?.activeClients.data.filter((client) => {
      const matchesSearch =
        !search ||
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = status === 'Todos' || client.status === status
      const matchesType = type === 'Todos' || client.secureType === type
      const matchesLocation =
        location === 'Todos' || client.location === location

      return matchesSearch && matchesStatus && matchesType && matchesLocation
    }) || []

  return (
    <Card className="col-span-3 bg-[#171d30] border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-xl mb-4">
          Clientes Ativos
        </CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-[#393e4e] border-slate-600 text-white placeholder:text-gray-400"
            />
          </div>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40 bg-[#393e4e] border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#393e4e] border-slate-600 text-white">
              {data?.activeClients.filters.status.map((statusOption) => (
                <SelectItem key={statusOption} value={statusOption}>
                  {statusOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-40 bg-[#393e4e] border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#393e4e] border-slate-600 text-white">
              {data?.activeClients.filters.secureType.map((typeOption) => (
                <SelectItem key={typeOption} value={typeOption}>
                  {typeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-40 bg-[#393e4e] border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#393e4e] border-slate-600 text-white">
              {data?.activeClients.filters.locations.map((locationOption) => (
                <SelectItem key={locationOption} value={locationOption}>
                  {locationOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-white">Cliente</TableHead>
              <TableHead className="text-white">Tipo</TableHead>
              <TableHead className="text-white">Valor Mensal</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Renovação</TableHead>
              <TableHead className="text-white">Região</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow
                key={client.id}
                className="border-slate-700 hover:bg-slate-700"
              >
                <TableCell className="text-white">
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-slate-400">{client.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">
                  {client.secureType}
                </TableCell>
                <TableCell className="text-white font-medium">
                  R$ {client.monthValue.toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={client.status === 'Ativo' ? 'success' : 'warning'}
                    className={`text-black ${
                      client.status === 'Ativo'
                        ? 'bg-[#43D2CB]'
                        : 'bg-[#D2B843]'
                    }`}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300">
                  {client.renewalDate}
                </TableCell>
                <TableCell className="text-slate-300">
                  {client.location}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
