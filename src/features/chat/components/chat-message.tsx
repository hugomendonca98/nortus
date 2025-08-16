import { BotIcon, CheckCheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Message } from '../types'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'
  const isAISuggestion = message.sender === 'ai-suggestion'

  if (isAISuggestion) {
    return (
      <div className="flex justify-end mb-2">
        <div className="bg-gray-700 rounded-lg px-4 py-2 max-w-xs lg:max-w-md border-2 border-[#ffffff1a] rounded-br-none">
          <div className="flex items-center gap-2 mb-2">
            <BotIcon className="w-4 h-4 text-white/50" />
            <span className="text-sm text-white/50">Sugestão da IA</span>
          </div>
          <p className="text-sm text-white">{message.content}</p>
          <div className="flex items-center gap-2 justify-end mt-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex mb-4', isUser ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'rounded-lg px-4 py-1 max-w-xs lg:max-w-md',
          isUser
            ? 'bg-[#1876D2] text-white rounded-bl-none'
            : 'bg-gray-700 border-2 border-[#ffffff1a] text-white rounded-br-none',
        )}
      >
        <p className="text-sm text-white/50 mb-1">{message.senderName}</p>
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center gap-2 justify-end mt-2">
          <span className="text-xs opacity-70">{message.timestamp}</span>
          {isUser && <CheckCheckIcon className="w-3 h-3 text-white" />}
        </div>
      </div>
    </div>
  )
}
