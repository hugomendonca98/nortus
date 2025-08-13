/**
 * Funções auxiliares para gerenciamento de cookies
 */

/**
 * Define um cookie com nome, valor e dias de expiração
 * @param name - Nome do cookie
 * @param value - Valor do cookie
 * @param days - Dias até expirar (padrão: 7 dias)
 */
export const setCookie = (
  name: string,
  value: string,
  days: number = 7,
): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

/**
 * Obtém o valor de um cookie pelo nome
 * @param name - Nome do cookie
 * @returns Valor do cookie ou null se não existir
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }

  return null
}

/**
 * Remove um cookie definindo sua data de expiração para o passado
 * @param name - Nome do cookie a ser removido
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

/**
 * Verifica se um cookie existe
 * @param name - Nome do cookie
 * @returns true se o cookie existir, false caso contrário
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null
}

/**
 * Obtém todos os cookies como um objeto
 * @returns Objeto com todos os cookies
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {}
  const ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    const eqPos = c.indexOf('=')
    if (eqPos > 0) {
      const name = c.substring(0, eqPos)
      const value = c.substring(eqPos + 1)
      cookies[name] = value
    }
  }

  return cookies
}
