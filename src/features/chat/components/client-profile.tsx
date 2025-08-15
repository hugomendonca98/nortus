import { Phone, Mail, MoreHorizontal } from 'lucide-react'

interface ClientProfileProps {
  client: {
    name: string
    initials: string
    type: string
    phone?: string
    email?: string
  }
}

export function ClientProfile({ client }: ClientProfileProps) {
  return (
    <div className="text-center mb-6 py-6">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-white text-2xl font-bold">{client.initials}</span>
      </div>
      <h3 className="text-white text-lg font-semibold mb-1">{client.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{client.type}</p>

      <div className="flex justify-center gap-6 border-b border-[#ffffff1a] pb-4">
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
          <Phone className="w-5 h-5 text-[#1876D2]" />
          <span className="text-xs">Telefonar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
          <Mail className="w-5 h-5 text-[#1876D2]" />
          <span className="text-xs">Enviar e-mail</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#1876D2]" />
          <span className="text-xs">Ver mais</span>
        </button>
      </div>
    </div>
  )
}
