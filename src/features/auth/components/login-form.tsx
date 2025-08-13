'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLoginForm } from '../hooks/use-login-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { form, onSubmit, isLoading, error } = useLoginForm()
  const {
    register,
    formState: { errors },
    watch,
  } = form

  const rememberUser = watch('rememberUser')

  return (
    <div className="w-full">
      <h2 className="text-3xl text-[#E3E3E3] mb-2 font-space-grotesk">Login</h2>
      <p className="text-[#E3E3E3] mb-8">
        Entre com suas credenciais para acessar a sua conta.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <input
            {...register('email')}
            type="text"
            className={`w-full px-4 py-3 border rounded-xl bg-transparent text-white placeholder-[#737677] focus:outline-none focus:border-[#7DD3FC] transition-colors ${
              errors.email ? 'border-red-500' : 'border-[#737677]'
            }`}
            placeholder="Usuário*"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2 ml-1">
              {errors.email.message}
            </p>
          )}
          <p className="text-[#737677] text-sm mt-2 ml-1">
            Insira seu e-mail, CPF ou passaporte.
          </p>
        </div>

        {/* Password Field */}
        <div>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className={`w-full px-4 py-3 border rounded-xl bg-transparent text-white placeholder-[#737677] focus:outline-none focus:border-[#7DD3FC] transition-colors pr-12 ${
                errors.password ? 'border-red-500' : 'border-[#737677]'
              }`}
              placeholder="Senha*"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#7DD3FC] transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-2 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember User and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={rememberUser}
              onCheckedChange={(checked) =>
                form.setValue(
                  'rememberUser',
                  checked === 'indeterminate' ? false : checked,
                )
              }
            />
            <span className="text-[#E3E3E3] text-sm font-space-grotesk">
              Lembrar meu usuário
            </span>
          </label>
          <a
            href="#"
            className="text-bright-navy-blue text-sm hover:underline font-space-grotesk font-medium"
          >
            Esqueci minha senha
          </a>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Login Button */}
        <Button type="submit" className="w-full h-12 mt-4" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
