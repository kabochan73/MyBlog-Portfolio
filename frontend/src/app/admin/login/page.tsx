import LoginForm from '@/app/_components/admin/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">管理者ログイン</h1>
        <LoginForm />
      </div>
    </div>
  )
}
