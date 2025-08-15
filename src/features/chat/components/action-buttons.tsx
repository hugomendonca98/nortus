import { Send, Phone, History } from 'lucide-react'

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
        <Send className="w-4 h-4" />
        Enviar proposta
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
        <Phone className="w-4 h-4" />
        Fazer ligação
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
        <History className="w-4 h-4" />
        Ver histórico
      </button>
    </div>
  )
}
