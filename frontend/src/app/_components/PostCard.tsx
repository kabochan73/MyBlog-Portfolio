import Link from 'next/link'
import type { Post } from '@/types'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ja-JP')
    : ''

  return (
    <article className="border-b border-gray-200 py-6">
      <Link href={`/posts/${post.slug}`} className="group block">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600">
          {post.title}
        </h2>
      </Link>
      <div className="mt-2 flex items-center gap-3">
        <time className="text-sm text-gray-500">{date}</time>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
