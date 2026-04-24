'use client'

import type { Tag } from '@/types'

type Props = {
  keyword: string
  tag: string
  tags: Tag[]
  onKeywordChange: (value: string) => void
  onTagChange: (value: string) => void
}

export default function Filter({ keyword, tag, tags, onKeywordChange, onTagChange }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="記事を検索..."
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange('')}
          className={`rounded-full px-3 py-1 text-sm transition-transform duration-200 hover:-translate-y-1 ${tag === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          すべて
        </button>
        {tags.map((t) => (
          <button
            key={t.id}
            onClick={() => onTagChange(tag === t.slug ? '' : t.slug)}
            className={`rounded-full px-3 py-1 text-sm transition-transform duration-200 hover:-translate-y-1 ${tag === t.slug ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
