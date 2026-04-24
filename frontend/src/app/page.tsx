import { getPosts, getTags } from '@/lib/api'
import PostCard from './_components/PostCard'

export const revalidate = false

type Props = {
  searchParams: Promise<{ keyword?: string; tag?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { keyword, tag } = await searchParams
  const [posts, tags] = await Promise.all([
    getPosts({ keyword, tag }),
    getTags(),
  ])

  return (
    <div>
      <form className="mb-6 flex gap-2">
        <input
          type="text"
          name="keyword"
          defaultValue={keyword}
          placeholder="記事を検索..."
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          検索
        </button>
      </form>

      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/"
          className={`rounded-full px-3 py-1 text-sm ${!tag ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          すべて
        </a>
        {tags.map((t) => (
          <a
            key={t.id}
            href={`/?tag=${t.slug}`}
            className={`rounded-full px-3 py-1 text-sm ${tag === t.slug ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t.name}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">記事がありません。</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}
