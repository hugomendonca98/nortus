'use client'

import React, { useState, useEffect } from 'react'
import { ChatArea } from './chat-area'
import { ChatSidebar } from './chat-sidebar'
import { ChatContainerSkeleton } from './skeletons'
import { Message, Client } from '../types'
import { useChatData } from '../hooks/use-chat-data'
import { use360ViewData } from '../hooks/use-360-view-data'

export function ChatContainer() {
  const {
    data: chatData,
    isLoading: chatLoading,
    error: chatError,
  } = useChatData()
  const {
    data: sidebarData,
    isLoading: sidebarLoading,
    error: sidebarError,
  } = use360ViewData()

  const finalMessages = chatData?.messages || []
  const finalAiSuggestion = chatData?.aiSuggestion || ''
  const finalAiAnalytics = chatData?.aiAnalytics || []
  const finalAiLocales = chatData?.aiLocales || []
  const finalAiRecomendedActions = chatData?.aiRecomendedActions || []

  const finalClient = {
    ...sidebarData?.client,
    initials: sidebarData?.client.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  } as Client

  const finalProducts = sidebarData?.products || []
  const finalProfileTags = sidebarData?.profileTags || []
  const finalAppActions = sidebarData?.appActions || []

  const [messages, setMessages] = useState<Message[]>(finalMessages || [])

  useEffect(() => {
    if (chatData?.messages) {
      setMessages(chatData.messages)
    }
  }, [chatData?.messages])

  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sender: 'user',
      senderName: 'Ricardo Leite - Seguro Automóvel',
    }
    setMessages((prev) => [...prev, newMessage])
  }

  if (chatLoading || sidebarLoading) {
    return <ChatContainerSkeleton />
  }

  if (chatError || sidebarError) {
    return (
      <div className="flex h-full bg-[#0B1125] items-center justify-center">
        <div className="text-white">Erro ao carregar chat</div>
      </div>
    )
  }

  return (
    <div className="flex h-full bg-[#0B1125]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatArea messages={messages} onSendMessage={handleSendMessage} />
      </div>

      {/* Sidebar */}
      <ChatSidebar
        isMinimized={isSidebarMinimized}
        onToggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
        client={finalClient}
        products={finalProducts}
        profileTags={finalProfileTags}
        appActions={finalAppActions}
        aiSuggestion={finalAiSuggestion}
        aiAnalytics={finalAiAnalytics}
        aiLocales={finalAiLocales}
        aiRecomendedActions={finalAiRecomendedActions as any}
      />
    </div>
  )
}
