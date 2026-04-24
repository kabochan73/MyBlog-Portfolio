'use client'

import { useState } from 'react'
import type { Post, Tag } from '@/types'
import MarkdownRenderer from '../MarkdownRenderer'

type Props = {
  action: (formData: FormData) => Promise<void>
  tags: Tag[]
  post?: Post
}

export default function PostForm({ action, tags, post }: Props) {
  const [body, setBody] = useState(post?.body ?? '')
  const [preview, setPreview] = useState(false)

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={post?.title}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            本文（Markdown）
          </label>
          <div className="flex rounded border border-gray-300 overflow-hidden text-sm">
            <button
              type="button"
              onClick={() => setPreview(false)}
              className={`px-3 py-1 ${!preview ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              編集
            </button>
            <button
              type="button"
              onClick={() => setPreview(true)}
              className={`px-3 py-1 ${preview ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              プレビュー
            </button>
          </div>
        </div>
        {preview ? (
          <div className="mt-1 min-h-120 w-full rounded border border-gray-300 px-3 py-2">
            {body ? (
              <MarkdownRenderer content={body} />
            ) : (
              <p className="text-sm text-gray-400">本文を入力するとプレビューが表示されます。</p>
            )}
          </div>
        ) : (
          <textarea
            id="body"
            name="body"
            required
            rows={20}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        )}
        {preview && <input type="hidden" name="body" value={body} />}

      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          ステータス
        </label>
        <select
          id="status"
          name="status"
          defaultValue={post?.status ?? 'draft'}
          className="mt-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="draft">下書き</option>
          <option value="published">公開</option>
        </select>
      </div>

      {tags.length > 0 && (
        <div>
          <p className="block text-sm font-medium text-gray-700">タグ</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="tag_ids"
                  value={tag.id}
                  defaultChecked={post?.tags.some((t) => t.id === tag.id)}
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          保存
        </button>
        <a href="/admin/posts" className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
          キャンセル
        </a>
      </div>
    </form>
  )
}
