import { ChatAreaSkeleton } from './chat-area-skeleton'
import { ChatSidebarSkeleton } from './chat-sidebar-skeleton'

export function ChatContainerSkeleton() {
  return (
    <div className="flex h-full bg-[#0B1125]">
      {/* Chat Area Skeleton */}
      <ChatAreaSkeleton />

      {/* Sidebar Skeleton */}
      <ChatSidebarSkeleton />
    </div>
  )
}
