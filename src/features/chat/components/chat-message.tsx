import { CheckCheckIcon, Lightbulb } from 'lucide-react'
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
        <div className="bg-gray-700 rounded-lg px-4 py-3 max-w-xs lg:max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Sugestão da IA</span>
          </div>
          <p className="text-sm text-white">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex mb-4', isUser ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'rounded-lg px-4 py-3 max-w-xs lg:max-w-md',
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white',
        )}
      >
        {!isUser && message.senderName && (
          <div className="text-xs text-gray-300 mb-1 font-medium">
            {message.senderName}
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center gap-2 justify-end mt-2">
          <span className="text-xs opacity-70">{message.timestamp}</span>
          {isUser && <CheckCheckIcon className="w-3 h-3 text-white" />}
        </div>
      </div>
    </div>
  )
}
