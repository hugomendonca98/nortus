import Image from 'next/image'

interface AISuggestionSectionProps {
  suggestion: string
}

export function AISuggestionSection({ suggestion }: AISuggestionSectionProps) {
  return (
    <div className="my-6">
      <div className="py-4 px-5 bg-[#10162b] rounded-2xl border border-slate-700">
        <h4 className="text-white font-medium">Sugestão da IA</h4>
        <p className="text-gray-400 text-sm mb-3">Interação detectada:</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-white text-xs pr-8">{suggestion}</p>

          <Image
            src="/images/ai-icon.png"
            alt="AI"
            width={100}
            height={100}
            className="-mt-14"
          />
        </div>
      </div>
    </div>
  )
}
