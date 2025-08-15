export function ChatAreaSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-[#0B1125]">
      {/* Header da área de chat */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-600 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-600 rounded animate-pulse w-32"></div>
            <div className="h-3 bg-slate-600 rounded animate-pulse w-24"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-slate-600 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-slate-600 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-slate-600 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Mensagem do usuário */}
        <div className="flex justify-end">
          <div className="max-w-xs lg:max-w-md">
            <div className="bg-blue-600 rounded-2xl rounded-br-md p-3">
              <div className="h-4 bg-blue-500 rounded animate-pulse w-48"></div>
            </div>
            <div className="text-right mt-1">
              <div className="h-3 bg-slate-600 rounded animate-pulse w-16 ml-auto"></div>
            </div>
          </div>
        </div>

        {/* Mensagem do assistente */}
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md">
            <div className="bg-slate-700 rounded-2xl rounded-bl-md p-3">
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-40"></div>
                <div className="h-4 bg-slate-600 rounded animate-pulse w-36"></div>
                <div className="h-4 bg-slate-600 rounded animate-pulse w-32"></div>
              </div>
            </div>
            <div className="mt-1">
              <div className="h-3 bg-slate-600 rounded animate-pulse w-20"></div>
            </div>
          </div>
        </div>

        {/* Mensagem da IA */}
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md">
            <div className="bg-slate-600 rounded-2xl rounded-bl-md p-3">
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-44"></div>
                <div className="h-4 bg-slate-600 rounded animate-pulse w-40"></div>
              </div>
            </div>
            <div className="mt-1">
              <div className="h-3 bg-slate-600 rounded animate-pulse w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Área de input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-12 bg-slate-700 rounded-2xl animate-pulse"></div>
          </div>
          <div className="w-12 h-12 bg-slate-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
