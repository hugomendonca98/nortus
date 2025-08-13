'server-only'

import { cookies } from 'next/headers'

/**
 * Verifica se o usuário está logado baseado na existência do token (Server side)
 * @returns token se o usuário estiver logado, undefined caso contrário
 */
export const isAuth = async (): Promise<string | undefined> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  return token
}
