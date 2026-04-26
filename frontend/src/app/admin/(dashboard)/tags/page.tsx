import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getTags } from '@/lib/api'
import { createTagAction } from '@/lib/actions'
import DeleteTagButton from '@/app/_components/admin/DeleteTagButton'

export default async function AdminTagsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')

  const tags = await getTags()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">タグ管理</h1>
        <Link href="/admin/posts" className="text-2xl text-gray-500 hover:underline">
          ← 記事一覧
        </Link>
      </div>

      <form action={createTagAction} className="mb-8 flex gap-2">
        <input
          type="text"
          name="name"
          required
          placeholder="新しいタグ名"
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          追加
        </button>
      </form>

      <div className="overflow-hidden rounded border border-gray-200 bg-white">
        {tags.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-500">タグがありません。</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tags.map((tag) => (
              <li key={tag.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <span className="font-medium text-gray-900">{tag.name}</span>
                  <span className="ml-2 text-xs text-gray-400">{tag.slug}</span>
                </div>
                <DeleteTagButton id={tag.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
