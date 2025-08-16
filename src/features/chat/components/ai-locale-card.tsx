import Image from 'next/image'

interface AiLocaleCardProps {
  locales: {
    title: string
    description: string
  }[]
}

export function AiLocaleCard({ locales }: AiLocaleCardProps) {
  return (
    <div className="my-6">
      <div className="py-4 px-5 bg-[#4f5362] rounded-2xl border border-slate-700 bg-[url(/images/locale-bg-effect.png)] bg-cover bg-right">
        <h4 className="text-white font-medium">Próximos passos</h4>

        <div className="flex justify-between items-center gap-2 mt-4">
          <div className="flex flex-col gap-2">
            {locales.map((locale, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span className="w-2 h-2 bg-[#22ABDD] rounded-full shadow shadow-[#22ABDD]"></span>
                <div>
                  <p className="text-gray-400 text-sm">{locale.title}</p>
                  <p className="text-white text-xs pr-8">
                    {locale.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/images/locale-icon.png"
            alt="AI"
            width={90}
            height={90}
            className="-mt-14"
          />
        </div>
      </div>
    </div>
  )
}
