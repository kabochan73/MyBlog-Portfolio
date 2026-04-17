"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import TagBadge from "@/components/TagBadge";
import { adminFetch } from "@/lib/api";
import type { Post } from "@/lib/types";

type Props = {
  posts: Post[];
};

export default function AdminPostList({ posts }: Props) {
  const router = useRouter();

  if (posts.length === 0) {
    return <p className="text-zinc-500">記事がありません。</p>;
  }

  async function handleDelete(id: number) {
    if (!confirm("この記事を削除しますか？")) return;
    await adminFetch(`/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="border-b border-zinc-100 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-semibold text-zinc-900">{post.title}</span>
                {post.status === "draft" && (
                  <span className="inline-block px-2 py-0.5 text-xs text-zinc-500 bg-zinc-100 rounded">
                    下書き
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <span className="text-xs text-zinc-400">{post.published_at?.slice(0, 10)}</span>
                {post.tags.map((tag) => (
                  <TagBadge key={tag.id} tag={tag} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href={`/admin/posts/${post.id}/edit`} className="text-sm text-zinc-600 hover:text-zinc-900">
                編集
              </Link>
              <button onClick={() => handleDelete(post.id)} className="text-sm text-red-500 hover:text-red-700">
                削除
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
