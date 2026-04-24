import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminGetPosts } from '@/lib/api'
import { logoutAction } from '@/lib/actions'
import DeleteButton from '@/app/_components/admin/DeleteButton'

export default async function AdminPostsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')

  const posts = await adminGetPosts(token)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">記事管理</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            新規作成
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-gray-500 hover:underline">
              ログアウト
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded border border-gray-200 bg-white">
        {posts.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-500">記事がありません。</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center justify-between px-4 py-4">
                <div>
                  <p className="font-medium text-gray-900">{post.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    <span className={post.status === 'published' ? 'text-green-600' : 'text-gray-400'}>
                      {post.status === 'published' ? '公開' : '下書き'}
                    </span>
                    {post.published_at && (
                      <span className="ml-2">
                        {new Date(post.published_at).toLocaleDateString('ja-JP')}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    編集
                  </Link>
                  <DeleteButton id={post.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
