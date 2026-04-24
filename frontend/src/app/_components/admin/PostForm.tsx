import type { Post, Tag } from '@/types'

type Props = {
  action: (formData: FormData) => Promise<void>
  tags: Tag[]
  post?: Post
}

export default function PostForm({ action, tags, post }: Props) {
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
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          本文（Markdown）
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={20}
          defaultValue={post?.body}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
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
