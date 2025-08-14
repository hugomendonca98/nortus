'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../stores/auth-store'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    // Inicializa a autenticação quando o componente é montado
    initializeAuth()
  }, [initializeAuth])

  return <>{children}</>
}
