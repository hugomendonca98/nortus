export interface ExternalChatMessage {
  id: string
  author: string
  content: string
  timestamp: string
  type: 'user_message' | 'assistant_message' | 'ai_suggestion'
}

export interface ConversationAnalysis {
  inights: {
    title: string
    insights: Array<{
      id: string
      type: string
      category: string
    }>
  }
  futureSteps: {
    title: string
    actions: Array<{
      id: string
      action: string
      priority: string
    }>
  }
}

export interface ExternalChatData {
  messages: ExternalChatMessage[]
  iaSugestion: string
  conversationAnalysis: ConversationAnalysis
}

export interface ChatData {
  messages: ChatMessage[]
  aiSuggestion: string
  aiAnalytics: Array<{
    title: string
    description: string
  }>
  aiLocales: Array<{
    title: string
    description: string
  }>
  aiRecomendedActions: {
    title: string
    description: string
    actions: Array<{
      title: string
      value: string
    }>
  }
}

export interface ChatMessage {
  id: string
  content: string
  timestamp: string
  sender: 'user' | 'assistant' | 'ai-suggestion'
  senderName?: string
}

// Tipos para a API 360-view
export interface External360ViewData {
  client: {
    name: string
    clientType: string
  }
  produtos: Array<{
    name: string
    value: number
    status: string
  }>
  profile: string[]
  capturedPhrases: Array<{
    phrase: string
    serviceDate: string
  }>
  appActions: Array<{
    action: string
    pageTime?: string
    accessed: string
  }>
  smartClassification: {
    segment: string
    lifeTimeValue: number
    churnProbability: number
    expansionScore: {
      level: string
      value: number
    }
    retetionScore: {
      level: string
      value: number
    }
  }
  sugestionsIA: {
    NBO: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
    NBA: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
    NBX: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
  }
}

export interface SidebarData {
  client: {
    name: string
    type: string
  }
  products: Array<{
    id: string
    name: string
    price: string
    status: 'active' | 'inactive'
  }>
  profileTags: string[]
  appActions: Array<{
    id: string
    action: string
    timeAgo: string
    details?: string
  }>
  smartClassification: {
    segment: string
    lifeTimeValue: number
    churnProbability: number
    expansionScore: {
      level: string
      value: number
    }
    retentionScore: {
      level: string
      value: number
    }
  }
  aiSuggestions: {
    nbo: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
    nba: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
    nbx: {
      offer: string
      value: number
      conversionProbability: number
      reasonsWhy: string[]
    }
  }
}
