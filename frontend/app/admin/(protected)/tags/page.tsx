"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Tag } from "@/lib/types";

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
      .then((res) => res.json())
      .then(setTags);
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("このタグを削除しますか？")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-zinc-900">タグ管理</h1>
        <Link
          href="/admin/tags/new"
          className="text-sm bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-700"
        >
          新規作成
        </Link>
      </div>
      {tags.length === 0 ? (
        <p className="text-zinc-500">タグがありません。</p>
      ) : (
        <ul className="space-y-3">
          {tags.map((tag) => (
            <li key={tag.id} className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-sm font-medium text-zinc-900">{tag.name}</span>
                <span className="ml-3 text-xs text-zinc-400 font-mono">{tag.slug}</span>
              </div>
              <button
                onClick={() => handleDelete(tag.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
