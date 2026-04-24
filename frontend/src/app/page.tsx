import { getPosts, getTags } from '@/lib/api'
import PostList from './_components/PostList'

export const revalidate = false

export default async function HomePage() {
  const [posts, tags] = await Promise.all([getPosts(), getTags()])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <PostList posts={posts} tags={tags} />
    </div>
  )
}
