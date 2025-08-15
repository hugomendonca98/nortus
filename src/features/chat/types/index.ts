export type {
  ExternalChatData,
  ExternalChatMessage,
  ConversationAnalysis,
  ChatData,
  External360ViewData,
  SidebarData,
} from './chat-data'

export interface Message {
  id: string
  content: string
  timestamp: string
  sender: 'user' | 'assistant' | 'ai-suggestion'
  senderName?: string
}

export interface Client {
  name: string
  initials: string
  type: string
  phone?: string
  email?: string
}

export interface Product {
  id: string
  name: string
  price: string
  status: 'active' | 'inactive'
}

export interface AppAction {
  id: string
  action: string
  timeAgo: string
  details?: string
}
