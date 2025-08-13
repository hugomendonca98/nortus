'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '../types/auth'
import { useAuthStore } from '../stores/auth-store'
import { useRouter } from 'next/navigation'

export const useLoginForm = () => {
  const { login, isLoading, error } = useAuthStore()
  const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberUser: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await login({
      email: data.email,
      password: data.password,
    })

    if (!error) {
      router.push('/dashboard')
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
  }
}
