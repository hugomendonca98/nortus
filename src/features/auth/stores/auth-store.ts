'use client'

import { create } from 'zustand'
import { AuthState, LoginFormData } from '../types/auth'
import { setCookie, getCookie, deleteCookie } from '@/lib/cookies'

// Usuários fake para demonstração
const FAKE_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    name: 'Usuário Comum',
    email: 'user@example.com',
    role: 'user',
  },
]

interface AuthStore extends AuthState {
  login: (data: LoginFormData) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthStore>((set, _get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }: LoginFormData) => {
    set({ isLoading: true, error: null })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = FAKE_USERS.find(
        (u) => u.email === email && u.password === password,
      )

      if (!user) {
        throw new Error('Credenciais inválidas')
      }

      const token = `fake_token_${user.id}_${Date.now()}`

      const userInfo = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      }
      localStorage.setItem('user', JSON.stringify(userInfo))

      setCookie('auth_token', token, 7)

      set({
        isAuthenticated: true,
        user: userInfo,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: 'Credenciais inválidas. Tente novamente.',
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
        localStorage.removeItem('user')
        deleteCookie('auth_token')
      }
    }
  },
}))
