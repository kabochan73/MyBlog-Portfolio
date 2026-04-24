import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { adminGetPost, getTags } from '@/lib/api'
import { updatePostAction } from '@/lib/actions'
import PostForm from '@/app/_components/admin/PostForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')

  const { id } = await params
  const [post, tags] = await Promise.all([
    adminGetPost(token, Number(id)),
    getTags(),
  ])

  const action = updatePostAction.bind(null, post.id)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">記事編集</h1>
        <Link href="/admin/posts" className="text-2xl text-gray-500 hover:underline">
          ← 記事一覧へ
        </Link>
      </div>
      <PostForm action={action} tags={tags} post={post} />
    </div>
  )
}
