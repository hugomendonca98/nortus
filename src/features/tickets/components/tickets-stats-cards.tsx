'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useTicketsData } from '../hooks/use-tickets-data'
import Image from 'next/image'

export function TicketsStatsCards() {
  const { data, isLoading } = useTicketsData({
    page: 1,
    limit: 5,
  })

  if (isLoading && !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="bg-[#171d30] border-slate-700 animate-pulse"
          >
            <CardContent className="p-6">
              <div className="h-4 bg-slate-600 rounded mb-2"></div>
              <div className="h-8 bg-slate-600 rounded mb-4"></div>
              <div className="h-8 w-8 bg-slate-600 rounded ml-auto"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Tickets Abertos */}
      <Card className="bg-[#171d30] border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between gap-8 w-full">
              <p className="text-slate-400 text-sm mb-1">Tickets Abertos</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-3xl font-bold">
                  {data?.stats.openTickets}
                </p>
                <div className="text-[#43D2CB]">
                  <Image
                    src="/images/ticket-open-icon.svg"
                    alt="Ticket"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Em andamento */}
      <Card className="bg-[#171d30] border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between gap-8 w-full">
              <p className="text-slate-400 text-sm mb-1">Em andamento</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-3xl font-bold">
                  {data?.stats.inProgress}
                </p>
                <div className="text-[#D2B843]">
                  <Image
                    src="/images/ticket-progress-icon.svg"
                    alt="Ticket"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Resolvidos hoje */}
      <Card className="bg-[#171d30] border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between gap-8 w-full">
              <p className="text-slate-400 text-sm mb-1">Resolvidos hoje</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-3xl font-bold">
                  {data?.stats.resolvedToday}
                </p>
                <div className="text-[#43D2CB]">
                  <Image
                    src="/images/ticket-solved-icon.svg"
                    alt="Ticket"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Tempo Médio */}
      <Card className="bg-[#171d30] border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between gap-8 w-full">
              <p className="text-slate-400 text-sm mb-1">Tempo Médio</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-3xl font-bold">
                  {data?.stats.averageTime}
                </p>
                <div className="text-[#43D2CB]">
                  <Image
                    src="/images/ticket-time-icon.svg"
                    alt="Ticket"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
