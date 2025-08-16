'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useCreateTicket } from '../hooks/use-tickets-data'
import { CreateTicketData } from '../types/ticket-data'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface CreateTicketModalProps {
  onTicketCreated?: () => void
}

// Schema de validação com Zod
const createTicketSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  clientEmail: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  priority: z.enum(['Urgente', 'Média', 'Baixa']),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
})

type CreateTicketFormData = z.infer<typeof createTicketSchema>

export function CreateTicketModal({ onTicketCreated }: CreateTicketModalProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      priority: 'Média',
      clientName: '',
      clientEmail: '',
      responsible: '',
      subject: '',
    },
  })

  const createTicketMutation = useCreateTicket()

  const onSubmit = async (data: CreateTicketFormData) => {
    try {
      const ticketData: CreateTicketData = {
        priority: data.priority,
        client: data.clientName,
        email: data.clientEmail,
        subject: data.subject,
        responsible: data.responsible,
      }

      await createTicketMutation.mutateAsync(ticketData)
      setOpen(false)
      reset()

      // Reset da página para 1 para mostrar o novo ticket
      const url = new URL(window.location.href)
      url.searchParams.set('page', '1')
      window.history.replaceState({}, '', url.toString())

      // Toast de sucesso
      toast.success('Ticket criado com sucesso', {
        description: 'O ticket foi criado e já está na sua lista.',
        action: {
          label: <XIcon className="w-4 h-4" />,
          onClick: () => {},
        },
      })

      // Callback para notificar que o ticket foi criado
      onTicketCreated?.()
    } catch (error) {
      console.error('Erro ao criar ticket:', error)
      toast.error('Erro ao criar ticket')
    }
  }

  const resetForm = () => {
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1876D2] hover:bg-[#1876D2]/80 text-white shadow shadow-[#1876D2] rounded-3xl py-5">
          <Plus className="h-4 w-4 mr-2" />
          Novo Ticket
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-[#0b1125] border-none text-white max-w-lg py-4 max-h-[99vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl text-white font-space-grotesk font-normal">
                Novo Ticket
              </DialogTitle>
              <DialogDescription className="text-slate-300 font-space-grotesk font-normal">
                Preencha os dados abaixo para registrar um novo ticket na
                plataforma.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-slate-700 rounded-full w-8 h-8 p-0 ml-4 border border-white"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nome do cliente
            </label>
            <Input
              {...register('clientName')}
              className={`bg-[#171d30] border-[#ffffff1a] text-white placeholder:text-slate-400 rounded-3xl py-6 ${
                errors.clientName ? 'border-red-500' : ''
              }`}
              placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
            />
            {errors.clientName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.clientName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <Input
              type="email"
              {...register('clientEmail')}
              className={`bg-[#171d30] border-[#ffffff1a] text-white placeholder:text-slate-400 rounded-3xl py-6 ${
                errors.clientEmail ? 'border-red-500' : ''
              }`}
              placeholder="E-mail de contato para atualizações e resposta"
            />
            {errors.clientEmail && (
              <p className="text-red-400 text-sm mt-1">
                {errors.clientEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Prioridade
            </label>
            <Select
              value={watch('priority')}
              onValueChange={(value: 'Urgente' | 'Média' | 'Baixa') =>
                setValue('priority', value)
              }
            >
              <SelectTrigger className="w-full py-6 bg-[#171d30] border-[#ffffff1a] text-white placeholder:text-slate-400 rounded-3xl">
                <SelectValue placeholder="Selecione o nível de urgência do atendimento" />
              </SelectTrigger>
              <SelectContent className="bg-[#171d30] border-slate-600">
                <SelectItem value="Urgente" className="text-white">
                  Urgente
                </SelectItem>
                <SelectItem value="Média" className="text-white">
                  Média
                </SelectItem>
                <SelectItem value="Baixa" className="text-white">
                  Baixa
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Responsável
            </label>
            <Select
              value={watch('responsible')}
              onValueChange={(value) => setValue('responsible', value)}
            >
              <SelectTrigger
                className={`w-full py-6 bg-[#171d30] border-[#ffffff1a] text-white placeholder:text-slate-400 rounded-3xl ${
                  errors.responsible ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder="Quem será o responsável por esse ticket" />
              </SelectTrigger>
              <SelectContent className="bg-[#171d30] border-slate-600">
                <SelectItem value="Ana Silva" className="text-white">
                  Ana Silva
                </SelectItem>
                <SelectItem value="João Costa" className="text-white">
                  João Costa
                </SelectItem>
                <SelectItem value="Carlos Lima" className="text-white">
                  Carlos Lima
                </SelectItem>
                <SelectItem value="Anderson Freitas" className="text-white">
                  Anderson Freitas
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.responsible && (
              <p className="text-red-400 text-sm mt-1">
                {errors.responsible.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assunto
            </label>
            <textarea
              {...register('subject')}
              className={`w-full bg-[#171d30] border border-[#ffffff1a] text-white placeholder:text-slate-400 rounded-3xl min-h-[80px] resize-none p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.subject ? 'border-red-500' : ''
              }`}
              placeholder="Resumo breve do problema ou solicitação"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                resetForm()
              }}
              className="px-8 py-6 bg-transparent border-white text-white rounded-3xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-8 py-6 bg-[#1876d2] hover:bg-[#1876d2]/80 text-white rounded-3xl"
              disabled={isSubmitting || createTicketMutation.isPending}
            >
              {isSubmitting || createTicketMutation.isPending
                ? 'Salvando...'
                : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
