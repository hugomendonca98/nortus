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
import { Button } from '@/components/ui/button'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from 'lucide-react'
import { useTicketsData, useUpdateTicket } from '../hooks/use-tickets-data'
import { TicketsTableSkeleton } from './skeletons'
import { useCallback, useState } from 'react'
import { useTicketsFilter } from '../hooks/use-tickets-filter'
import { EditIcon } from '@/components/icons/edit-icon'

export function TicketsTable() {
  const {
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
  } = useTicketsFilter()

  const [editingTicket, setEditingTicket] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{
    priority: 'Urgente' | 'Média' | 'Baixa'
    status: 'Aberto' | 'Em andamento' | 'Fechado' | 'Cancelado'
    responsible: string
  }>({
    priority: 'Média',
    status: 'Aberto',
    responsible: '',
  })

  const { data, isLoading, error } = useTicketsData({
    search: search || undefined,
    status: status !== 'Todos os status' ? status : undefined,
    priority: priority !== 'Todas as prioridades' ? priority : undefined,
    responsible:
      responsible !== 'Todos os responsáveis' ? responsible : undefined,
    page: parseInt(page || '1'),
    limit: 5,
  })

  const updateTicketMutation = useUpdateTicket()

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value || null)
      setPage('1') // Reset para primeira página ao buscar
    },
    [setSearch, setPage],
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage.toString())
    },
    [setPage],
  )

  const handleEdit = useCallback((ticket: any) => {
    setEditingTicket(ticket.id)
    setEditForm({
      priority: ticket.priority,
      status: ticket.status,
      responsible: ticket.responsible,
    })
  }, [])

  const handleSaveEdit = useCallback(
    async (ticketId: string) => {
      try {
        await updateTicketMutation.mutateAsync({
          id: ticketId,
          data: editForm,
        })
        setEditingTicket(null)
        setEditForm({ priority: 'Média', status: 'Aberto', responsible: '' })
      } catch (error) {
        console.error('Erro ao atualizar ticket:', error)
      }
    },
    [editForm, updateTicketMutation],
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-[#BA1A1A] text-white hover:bg-[#BA1A1A]'
      case 'Média':
        return 'bg-[#B5EDFF] text-black hover:bg-[#B5EDFF]'
      case 'Baixa':
        return 'bg-[#E0F7FF] text-black hover:bg-[#E0F7FF]'
      default:
        return 'bg-gray-400 text-black hover:bg-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'bg-[#43D2CB] text-black hover:bg-[#43D2CB]'
      case 'Em andamento':
        return 'bg-[#D2B843] text-black hover:bg-[#D2B843]'
      case 'Fechado':
        return 'bg-black text-white hover:bg-black'
      case 'Cancelado':
        return 'bg-red-600 text-white hover:bg-red-600'
      default:
        return 'bg-gray-400 text-black hover:bg-gray-400'
    }
  }

  if (isLoading && !data) {
    return <TicketsTableSkeleton />
  }

  if (error) {
    return (
      <Card className="col-span-3 bg-[#171d30] border-slate-700">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-center">
            <p className="text-red-400 mb-2">Erro ao carregar tickets</p>
            <p className="text-slate-400 text-sm">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-3 bg-[#171d30] border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">Lista de Tickets</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Buscar por ID, cliente ou assunto..."
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
              {data?.statuses.map((statusOption) => (
                <SelectItem
                  key={statusOption}
                  value={statusOption}
                  className="text-white"
                >
                  {statusOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-40 bg-[#0B1125] border-none text-white rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1125] border-slate-600">
              <SelectItem value="Todas as prioridades" className="text-white">
                Todas as prioridades
              </SelectItem>
              {data?.priorities.map((priorityOption) => (
                <SelectItem
                  key={priorityOption}
                  value={priorityOption}
                  className="text-white"
                >
                  {priorityOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={responsible} onValueChange={setResponsible}>
            <SelectTrigger className="w-40 bg-[#0B1125] border-none text-white rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1125] border-slate-600">
              <SelectItem value="Todos os responsáveis" className="text-white">
                Todos os responsáveis
              </SelectItem>
              {data?.responsibles.map((responsibleOption) => (
                <SelectItem
                  key={responsibleOption}
                  value={responsibleOption}
                  className="text-white"
                >
                  {responsibleOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 text-white hover:bg-transparent">
              <TableHead>ID</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="border-slate-700 hover:bg-slate-700"
              >
                <TableCell className="text-white font-medium">
                  {ticket.id}
                </TableCell>
                <TableCell>
                  {editingTicket === ticket.id ? (
                    <Select
                      value={editForm.priority}
                      onValueChange={(value: 'Urgente' | 'Média' | 'Baixa') =>
                        setEditForm((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger className="w-24 bg-[#0B1125] border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1125] border-slate-600">
                        {data?.priorities.map((priorityOption) => (
                          <SelectItem
                            key={priorityOption}
                            value={priorityOption}
                            className="text-white"
                          >
                            {priorityOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  <div>
                    <div className="font-medium">{ticket.client.name}</div>
                    <div className="text-sm text-slate-400">
                      {ticket.client.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300 max-w-xs truncate">
                  {ticket.subject}
                </TableCell>
                <TableCell>
                  {editingTicket === ticket.id ? (
                    <Select
                      value={editForm.status}
                      onValueChange={(
                        value:
                          | 'Aberto'
                          | 'Em andamento'
                          | 'Fechado'
                          | 'Cancelado',
                      ) => setEditForm((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="w-28 bg-[#0B1125] border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1125] border-slate-600">
                        {data?.statuses.map((statusOption) => (
                          <SelectItem
                            key={statusOption}
                            value={statusOption}
                            className="text-white"
                          >
                            {statusOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-slate-300">
                  {ticket.createdAt}
                </TableCell>
                <TableCell className="text-slate-300">
                  {editingTicket === ticket.id ? (
                    <Select
                      value={editForm.responsible}
                      onValueChange={(value) =>
                        setEditForm((prev) => ({ ...prev, responsible: value }))
                      }
                    >
                      <SelectTrigger className="w-32 bg-[#0B1125] border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1125] border-slate-600">
                        {data?.responsibles.map((responsibleOption) => (
                          <SelectItem
                            key={responsibleOption}
                            value={responsibleOption}
                            className="text-white"
                          >
                            {responsibleOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    ticket.responsible
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingTicket === ticket.id ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-400 hover:bg-transparent hover:text-green-400 bg-transparent"
                          onClick={() => handleSaveEdit(ticket.id)}
                          disabled={updateTicketMutation.isPending}
                        >
                          {updateTicketMutation.isPending
                            ? 'Salvando...'
                            : 'Salvar'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent bg-transparent"
                          onClick={() => setEditingTicket(null)}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent"
                          onClick={() => handleEdit(ticket)}
                        >
                          Editar
                          <EditIcon className="ml-1 h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent"
                        >
                          Ver
                          <ChevronRight className="ml-1 h-3 w-3 text-[#1876D2]" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginação alinhada à direita */}
        {data?.pagination && (
          <div className="flex items-center justify-end mt-6 space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent bg-transparent"
              onClick={() => handlePageChange(1)}
              disabled={!data.pagination.hasPrevPage}
            >
              <ChevronFirst className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent bg-transparent"
              onClick={() => handlePageChange(data.pagination.currentPage - 1)}
              disabled={!data.pagination.hasPrevPage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-white px-3 py-2">
              {data.pagination.currentPage} de {data.pagination.totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent bg-transparent"
              onClick={() => handlePageChange(data.pagination.currentPage + 1)}
              disabled={!data.pagination.hasNextPage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#EFF6FF] hover:text-[#EFF6FF] hover:bg-transparent bg-transparent"
              onClick={() => handlePageChange(data.pagination.totalPages)}
              disabled={!data.pagination.hasNextPage}
            >
              <ChevronLast className="h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
