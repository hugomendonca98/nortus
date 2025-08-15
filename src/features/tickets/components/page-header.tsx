'use client'

import { CreateTicketModal } from './create-ticket-modal'

export function PageHeader() {
  return (
    <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 text-white flex items-center justify-between pr-6">
      <h1 className="text-xl font-semibold">Gestão de Tickets</h1>
      <CreateTicketModal />
    </div>
  )
}
