import React from 'react'
import { ChatMessage } from './chat-message'
import { ActionButtons } from './action-buttons'
import { ChatInput } from './chat-input'
import { Message } from '../types'

interface ChatAreaProps {
  messages: Message[]
  onSendMessage: (message: string) => void
}

export function ChatArea({ messages, onSendMessage }: ChatAreaProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 mx-auto">
        <div className="text-sm text-gray-400 mb-1">
          HOJE,{' '}
          {new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ChatMessage message={message} />
            {/* Show action buttons immediately after AI suggestions */}
            {message.sender === 'ai-suggestion' && (
              <div className="flex justify-end mb-2">
                <ActionButtons />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  )
}
