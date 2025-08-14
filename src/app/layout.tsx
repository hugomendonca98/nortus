import type { Metadata } from 'next'
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/features/auth/components/auth-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const spaceGrotesk = SpaceGrotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Nortus',
  description: 'Nortus',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>
            <AuthProvider>{children}</AuthProvider>
          </NuqsAdapter>
        </ReactQueryProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
