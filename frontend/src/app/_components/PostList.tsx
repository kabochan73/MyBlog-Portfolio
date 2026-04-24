'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Post, Tag } from '@/types'
import Filter from './Filter'

type Props = {
  posts: Post[]
  tags: Tag[]
}

export default function PostList({ posts, tags }: Props) {
  const [keyword, setKeyword] = useState('')
  const [tag, setTag] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchKeyword = keyword === '' || p.title.toLowerCase().includes(keyword.toLowerCase())
      const matchTag = tag === '' || p.tags.some((t) => t.slug === tag)
      return matchKeyword && matchTag
    })
  }, [posts, keyword, tag])

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      <div className="w-full md:flex-1 md:order-2 md:sticky md:top-8 md:self-start">
        <Filter
          keyword={keyword}
          tag={tag}
          tags={tags}
          onKeywordChange={setKeyword}
          onTagChange={setTag}
        />
      </div>
      <div className="w-full md:flex-3 md:order-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">記事が見つかりませんでした。</p>
        ) : (
          <ul className="space-y-6">
            {filtered.map((post) => (
              <li key={post.id} className="border-b pb-6 transition-transform duration-200 hover:-translate-y-1">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  <h2 className="text-3xl font-semibold">{post.title}</h2>
                </Link>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <time>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('ja-JP')
                      : ''}
                  </time>
                  <div className="flex gap-1">
                    {post.tags.map((t) => (
                      <span key={t.id} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
