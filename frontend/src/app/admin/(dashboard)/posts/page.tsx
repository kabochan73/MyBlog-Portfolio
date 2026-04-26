import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminGetPosts, getTags } from '@/lib/api'
import AdminPostList from '@/app/_components/admin/AdminPostList'

export default async function AdminPostsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')

  const [posts, tags] = await Promise.all([adminGetPosts(token), getTags()])

  return <AdminPostList posts={posts} tags={tags} />
}
