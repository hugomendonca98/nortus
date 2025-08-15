import Image from 'next/image'

interface AiRecomendedActionsCardProps {
  title: string
  description: string
  actions: {
    title: string
    value: string
  }[]
}

export default function AiRecomendedActionsCard({
  title,
  description,
  actions,
}: AiRecomendedActionsCardProps) {
  return (
    <div className="p-4 bg-[#4f5362] rounded-2xl border border-slate-700 relative overflow-hidden">
      <h4 className="text-white font-medium">Ações recomendadas</h4>

      <div className="bg-[#2895d4] rounded-2xl p-4 mt-4">
        <Image
          src="/images/shield-icon.png"
          alt="AI"
          width={200}
          height={200}
          className="absolute top-5 -right-10 z-10"
        />
        <div className="mb-4">
          <p className="text-white font-medium">{title}</p>
          <p className="text-white text-sm">{description}</p>
        </div>

        {actions.map((action, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-white font-medium">{action.title}</p>
            <p className="text-white text-sm">{action.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
