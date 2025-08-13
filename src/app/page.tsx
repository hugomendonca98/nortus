import { AuthPage } from '@/features/auth/components/auth-page'
import { isAuth } from '@/features/auth/actions/is-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const isLogged = await isAuth()

  if (isLogged) {
    redirect('/dashboard')
  }

  return <AuthPage />
}
