import Image from 'next/image'

interface AiAnalyticsCardProps {
  analytics: {
    title: string
    description: string
  }[]
}

export function AiAnalyticsCard({ analytics }: AiAnalyticsCardProps) {
  return (
    <div className="my-6">
      <div className="py-4 px-5 bg-[#4f5362] rounded-2xl border border-slate-700 bg-[url(/images/brain-bg-effect.png)] bg-cover bg-right">
        <h4 className="text-white font-medium">Análise da IA</h4>

        <div className="flex justify-between items-center gap-2 mt-4">
          <div className="flex flex-col gap-2">
            {analytics.map((analytics) => (
              <div className="flex items-center gap-2" key={analytics.title}>
                <span className="w-2 h-2 bg-[#22ABDD] rounded-full shadow shadow-[#22ABDD]"></span>
                <div>
                  <p className="text-gray-400 text-sm">{analytics.title}</p>
                  <p className="text-white text-xs pr-8">
                    {analytics.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/images/brain-icon.png"
            alt="AI"
            width={120}
            height={120}
            className="-mt-14"
          />
        </div>
      </div>
    </div>
  )
}
