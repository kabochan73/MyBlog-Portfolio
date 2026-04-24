import Link from 'next/link'
import { logoutAction } from '@/lib/actions'

export default function AdminHeader() {
  return (
    <header className="border-b border-gray-400 bg-white w-full">
      <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
      <Link href="/admin/posts" className="text-2xl font-bold text-gray-900">
        記事管理
      </Link>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/tags"
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          タグ管理
        </Link>
        <Link
          href="/admin/posts/new"
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          新規作成
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-gray-500 hover:underline border borderq-gray-300 rounded px-4 py-2">
            ログアウト
          </button>
        </form>
      </div>
      </div>
    </header>
  )
}
