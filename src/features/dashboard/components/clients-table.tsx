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
    defaultValue: 'Todos os status',
  })
  const [type, setType] = useQueryState('type', {
    defaultValue: 'Todos os tipos',
  })
  const [location, setLocation] = useQueryState('location', {
    defaultValue: 'Todos os locais',
  })

  const { data, isLoading } = useDashboardData({
    search: search || undefined,
    status: status !== 'Todos os status' ? status : undefined,
    type: type !== 'Todos os tipos' ? type : undefined,
    location: location !== 'Todos os locais' ? location : undefined,
  })

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value || null)
    },
    [setSearch],
  )

  if (isLoading && !data) {
    return <ClientsTableSkeleton />
  }

  return (
    <Card className="col-span-3 bg-[#171d30] border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">Clientes ativos</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Buscar por nome ou email..."
              className="pl-10 bg-[#0B1125] border-none text-white placeholder:text-white rounded-full"
              value={search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40 bg-[#0B1125] border-none text-white rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1125] border-slate-600">
              <SelectItem value="Todos os status" className="text-white">
                Todos os status
              </SelectItem>
              <SelectItem value="Ativo" className="text-white">
                Ativo
              </SelectItem>
              <SelectItem value="Pendente" className="text-white">
                Pendente
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-40 bg-[#0B1125] border-none text-white rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1125] border-slate-600">
              {data?.clientMap.types.map((typeOption) => (
                <SelectItem
                  key={typeOption}
                  value={typeOption}
                  className="text-white"
                >
                  {typeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-40 bg-[#0B1125] border-none text-white rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1125] border-slate-600">
              {data?.clientMap.locations.map((locationOption) => (
                <SelectItem
                  key={locationOption}
                  value={locationOption}
                  className="text-white"
                >
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
            {data?.clientMap.clients.map((client) => (
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
                <TableCell className="text-slate-300">{client.type}</TableCell>
                <TableCell className="text-white font-medium">
                  R$ {client.monthlyValue.toFixed(2).replace('.', ',')}
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
                  {client.renewal}
                </TableCell>
                <TableCell className="text-slate-300">
                  {client.region}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
