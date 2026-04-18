"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/api";
import type { Tag } from "@/lib/types";

type Props = { initialTags: Tag[] };

export default function TagList({ initialTags }: Props) {
  const [tags, setTags] = useState(initialTags);

  async function handleDelete(id: number) {
    if (!confirm("このタグを削除しますか？")) return;
    await adminFetch(`/tags/${id}`, { method: "DELETE" });
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  if (tags.length === 0) return <p className="text-zinc-500">タグがありません。</p>;

  return (
    <ul className="space-y-3">
      {tags.map((tag) => (
        <li key={tag.id} className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <span className="text-sm font-medium text-zinc-900">{tag.name}</span>
            <span className="ml-3 text-xs text-zinc-400 font-mono">{tag.slug}</span>
          </div>
          <button onClick={() => handleDelete(tag.id)} className="text-sm text-red-500 hover:text-red-700">
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
