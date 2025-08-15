'use client'

import { create } from 'zustand'
import { AuthState, LoginFormData } from '../types/auth'
import { setCookie, getCookie, deleteCookie } from '@/lib/cookies'

interface AuthStore extends AuthState {
  login: (data: LoginFormData) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  initializeAuth: () => void
  syncWithLocalStorage: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  login: async ({ email }: LoginFormData) => {
    set({ isLoading: true, error: null })

    try {
      // Faz requisição para o mock API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login.json`,
        {
          method: 'GET',
        },
      )

      if (!response.ok) {
        throw new Error('Erro na requisição para o servidor')
      }

      const data = await response.json()

      if (!data.data || !data.data.accessToken) {
        throw new Error('Resposta inválida do servidor')
      }

      const { accessToken, username } = data.data

      // Cria objeto do usuário com os dados da resposta
      const userInfo = {
        id: 'user_001', // ID padrão já que não vem na resposta
        username: username || 'Assistente Colaborador',
        name: username || 'Assistente Colaborador',
        email, // Mantém o email do formulário
        role: 'customer', // Role padrão baseado na resposta
      }

      // Salva no localStorage
      localStorage.setItem('user', JSON.stringify(userInfo))
      setCookie('auth_token', accessToken, 7)

      set({
        isAuthenticated: true,
        user: userInfo,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: 'Erro ao fazer login. Tente novamente.',
      })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('user')
    deleteCookie('auth_token')

    set({
      isAuthenticated: false,
      user: null,
      error: null,
    })
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  initializeAuth: () => {
    const savedUser = localStorage.getItem('user')
    const token = getCookie('auth_token')

    if (savedUser && token) {
      try {
        const user = JSON.parse(savedUser)
        set({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        })
      } catch {
        // Se houver erro ao fazer parse, limpa os dados corrompidos
        localStorage.removeItem('user')
        deleteCookie('auth_token')
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        })
      }
    } else {
      // Se não houver usuário ou token, garante que o estado esteja limpo
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      })
    }
  },

  syncWithLocalStorage: () => {
    // Função para sincronizar manualmente com localStorage
    const savedUser = localStorage.getItem('user')
    const token = getCookie('auth_token')
    const currentState = get()

    if (savedUser && token && !currentState.isAuthenticated) {
      try {
        const user = JSON.parse(savedUser)
        set({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        })
      } catch {
        localStorage.removeItem('user')
        deleteCookie('auth_token')
      }
    } else if (!savedUser && currentState.isAuthenticated) {
      // Se não há usuário no localStorage mas o store está autenticado, limpa o estado
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      })
    }
  },
}))

// Listener para mudanças no localStorage (opcional, para sincronização em tempo real)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'user') {
      const store = useAuthStore.getState()
      store.syncWithLocalStorage()
    }
  })
}
