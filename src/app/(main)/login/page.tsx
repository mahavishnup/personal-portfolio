import { LoginForm } from '@/components/auth/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
