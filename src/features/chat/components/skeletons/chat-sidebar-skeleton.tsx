export function ChatSidebarSkeleton() {
  return (
    <div className="w-80 bg-[#171d30] border-l border-slate-700 overflow-y-auto">
      {/* Header do sidebar */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-600 rounded animate-pulse w-24"></div>
          <div className="w-6 h-6 bg-slate-600 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Perfil do cliente */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-slate-600 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-600 rounded animate-pulse w-32"></div>
            <div className="h-3 bg-slate-600 rounded animate-pulse w-28"></div>
          </div>
        </div>

        {/* Tags do perfil */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 bg-slate-600 rounded-full animate-pulse w-20"
            ></div>
          ))}
        </div>
      </div>

      {/* Produtos */}
      <div className="p-4 border-b border-slate-700">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-20 mb-3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
            >
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-28"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-20"></div>
              </div>
              <div className="w-3 h-3 bg-slate-600 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Ações do app */}
      <div className="p-4 border-b border-slate-700">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-24 mb-3"></div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-40"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-24"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sugestão da IA */}
      <div className="p-4 border-b border-slate-700">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-28 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-600 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-slate-600 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-slate-600 rounded animate-pulse w-1/2"></div>
        </div>
      </div>

      {/* Análise da IA */}
      <div className="p-4 border-b border-slate-700">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-24 mb-3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-32"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-28"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locais da IA */}
      <div className="p-4 border-b border-slate-700">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-28 mb-3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-36"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-40"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ações recomendadas */}
      <div className="p-4">
        <div className="h-4 bg-slate-600 rounded animate-pulse w-32 mb-3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-slate-600 rounded animate-pulse w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
