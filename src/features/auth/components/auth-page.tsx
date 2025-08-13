import { AuthHeader } from './auth-header'
import { LoginForm } from './login-form'
import { AuthIllustration } from './auth-illustration'

export const AuthPage = () => {
  return (
    <div className="min-h-screen bg-[#0A1128] flex">
      <div className="flex-1 flex flex-col justify-center px-16 py-8 mt-36 md:mt-0">
        <AuthHeader />
        <LoginForm />
      </div>

      <AuthIllustration />
    </div>
  )
}
