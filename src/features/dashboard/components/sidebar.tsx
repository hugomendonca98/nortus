'use client'

import { useUser } from '@/features/auth/hooks/use-user'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const sidebarItems = [
  { image: '/images/dashboard-icon.svg', label: 'Dashboard', active: true },
  { image: '/images/tickets-icon.svg', label: 'Empresas' },
  { image: '/images/chat-icon.svg', label: 'Chat' },
  { image: '/images/user-icon.svg', label: 'Usuários' },
  { image: '/images/calendar-icon.svg', label: 'Agenda' },
]

export function Sidebar() {
  const { userName } = useUser()

  return (
    <div className="flex h-screen w-32 flex-col bg-[#20273e] text-white rounded-tr-4xl shadow-2xl shadow-black z-20">
      {/* Header */}
      <div className="flex h-16 items-center justify-center px-6 border-b border-slate-800">
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo-icon.svg"
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-10"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-center space-y-4 p-4 pt-8 gap-4">
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg transition-colors cursor-pointer',
              item.active
                ? 'bg-[#1876d2] text-white shadow-md shadow-[#1876d2]/50'
                : 'text-slate-300 bg-[#2b3248] hover:bg-slate-700 hover:text-white',
            )}
          >
            <Image
              src={item.image}
              alt={item.label}
              width={100}
              height={100}
              className="h-6 w-6"
            />
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1876d2] text-white font-semibold text-lg">
            {userName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </div>
  )
}
