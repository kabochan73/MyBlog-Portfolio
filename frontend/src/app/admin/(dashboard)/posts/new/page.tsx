import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getTags } from '@/lib/api'
import { createPostAction } from '@/lib/actions'
import PostForm from '@/app/_components/admin/PostForm'

export default async function NewPostPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')

  const tags = await getTags()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">記事作成</h1>
        <Link href="/admin/posts" className="text-2xl text-gray-500 hover:underline">
          ←記事一覧へ
        </Link>
      </div>
      <PostForm action={createPostAction} tags={tags} />
    </div>
  )
}
