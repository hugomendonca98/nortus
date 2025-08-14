'use client'

import { useAuthStore } from '../stores/auth-store'
import { useEffect } from 'react'

export const useUser = () => {
  const { user, isAuthenticated, isLoading, error, syncWithLocalStorage } =
    useAuthStore()

  useEffect(() => {
    syncWithLocalStorage()
  }, [syncWithLocalStorage])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    hasRole: (role: string) => user?.role === role,
    isAdmin: () => user?.role === 'admin',
    isUser: () => user?.role === 'user',
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    userRole: user?.role,
    username: user?.username,
  }
}
