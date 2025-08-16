import { ChevronLeft } from 'lucide-react'
import { ClientProfile } from './client-profile'
import { ProductsSection } from './products-section'
import { ProfileSection } from './profile-section'
import { AppActionsSection } from './app-actions-section'
import { AISuggestionSection } from './ai-suggestion-section'
import { Client, Product, AppAction } from '../types'
import { Card } from '@/components/ui/card'
import { AiAnalyticsCard } from './ai-analytics-card'
import { AiLocaleCard } from './ai-locale-card'
import AiRecomendedActionsCard from './ai-recomended-actions-card'

interface ChatSidebarProps {
  isMinimized: boolean
  onToggleMinimize: () => void
  client: Client
  products: Product[]
  profileTags: string[]
  appActions: AppAction[]
  aiSuggestion: string
  aiAnalytics: {
    title: string
    description: string
  }[]
  aiLocales: {
    title: string
    description: string
  }[]
  aiRecomendedActions: {
    title: string
    description: string
    actions: {
      title: string
      value: string
    }[]
  }
}

export function ChatSidebar({
  isMinimized,
  onToggleMinimize,
  client,
  products,
  profileTags,
  appActions,
  aiSuggestion,

  aiAnalytics,
  aiLocales,
  aiRecomendedActions,
}: ChatSidebarProps) {
  if (isMinimized) {
    return (
      <div className="w-16 bg-[#20273e] border-l border-gray-700 flex flex-col items-center py-4">
        <button
          onClick={onToggleMinimize}
          className="text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {client.initials}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[480px] bg-[#22283a] border-l border-gray-700 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onToggleMinimize}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Minimizar
        </button>
      </div>

      <Card className="bg-[#101629] border border-slate-700 rounded-3xl">
        <ClientProfile client={client} />

        <ProductsSection products={products} />

        <ProfileSection tags={profileTags} />

        <AppActionsSection actions={appActions} />
      </Card>

      <AISuggestionSection suggestion={aiSuggestion} />
      <AiAnalyticsCard analytics={aiAnalytics} />
      <AiLocaleCard locales={aiLocales} />
      <AiRecomendedActionsCard
        title={aiRecomendedActions.title}
        description={aiRecomendedActions.description}
        actions={aiRecomendedActions.actions}
      />
    </div>
  )
}
