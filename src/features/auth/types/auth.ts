import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  rememberUser: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

export interface AuthState {
  isAuthenticated: boolean
  user: any | null
  isLoading: boolean
  error: string | null
}
