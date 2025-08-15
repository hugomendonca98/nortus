import { ChatContainerSkeleton } from './chat-container-skeleton'

export function ChatPageSkeleton() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-hidden mt-20">
        {/* Header Skeleton */}
        <div className="w-full h-20 bg-[#20273e] fixed top-0 left-0 right-0 z-10 pl-44 flex items-center">
          <div className="h-6 bg-slate-600 rounded animate-pulse w-48"></div>
        </div>

        {/* Chat Container Skeleton */}
        <div className="h-full">
          <ChatContainerSkeleton />
        </div>
      </main>
    </div>
  )
}
