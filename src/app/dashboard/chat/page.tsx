import { queryClient } from '@/lib/react-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'
import { ChatContainer } from '@/features/chat'
import { fetchChat } from '@/features/chat/services/fetch-chat'
import { fetch360View } from '@/features/chat/services/fetch-360-view'
import { Metadata } from 'next'
import { isAuth } from '@/features/auth/actions/is-auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Nortus - Chat',
  description: 'Chat',
}

export default async function ChatPage() {
  const token = await isAuth()

  if (!token) {
    redirect('/')
  }

  await queryClient.prefetchQuery({
    queryKey: ['chat'],
    queryFn: () => fetchChat(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['360-view'],
    queryFn: () => fetch360View(),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen">
        <main className="flex-1 overflow-hidden mt-20">
          <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 text-white flex items-center">
            <h1 className="text-xl font-semibold">Chat & Assistente Virtual</h1>
          </div>
          <div className="h-full">
            <ChatContainer />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  )
}
