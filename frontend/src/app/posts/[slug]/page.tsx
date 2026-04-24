import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/api'
import MarkdownRenderer from '@/app/_components/MarkdownRenderer'

export const revalidate = false

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const post = await getPost(slug).catch(() => null)
  if (!post) notFound()

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ja-JP')
    : ''

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3">
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
      </header>
      <MarkdownRenderer content={post.body} />
      <div className="mt-12">
        <Link href="/" className="text-xl flex justify-end text-gray-500 hover:text-gray-900">
          一覧に戻る
        </Link>
      </div>
    </article>
  )
}
