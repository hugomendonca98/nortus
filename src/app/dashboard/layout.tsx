import { Sidebar } from '@/features/dashboard/components/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#0b1125] relative">
        {children}
      </main>
    </div>
  )
}
