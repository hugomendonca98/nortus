'use client'

import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
}

export function ChatInput({
  onSendMessage,
  placeholder = 'Escreva aqui...',
}: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-t border-gray-700"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-6 rounded-full transition-colors"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  )
}
