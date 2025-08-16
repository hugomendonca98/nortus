import { Button } from '@/components/ui/button'

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button className="bg-[#1876D2] hover:bg-[#1876D2]/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow shadow-[#1876D2]">
        Enviar proposta
      </Button>
      <Button className="bg-[#1876D2] hover:bg-[#1876D2]/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow shadow-[#1876D2]">
        Fazer ligação
      </Button>
      <Button className="bg-[#1876D2] hover:bg-[#1876D2]/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow shadow-[#1876D2]">
        Ver histórico
      </Button>
    </div>
  )
}
