import { getPosts, getTags } from '@/lib/api'
import PostList from './_components/PostList'

export const revalidate = false

export default async function HomePage() {
  const [posts, tags] = await Promise.all([getPosts(), getTags()])

  return <PostList posts={posts} tags={tags} />
}
