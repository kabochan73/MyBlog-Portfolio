"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminPostList from "@/components/admin/AdminPostList";
import { adminFetch } from "@/lib/api";
import type { Post } from "@/lib/types";

export default function AdminPostsPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const params = status ? `?status=${status}` : "";
    adminFetch<Post[]>(`/posts${params}`).then(setPosts).catch(console.error);
  }, [status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-zinc-900">
          {status === "draft" ? "下書き一覧" : "記事一覧"}
        </h1>
        <Link
          href="/admin/posts/new"
          className="text-sm bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-700"
        >
          新規作成
        </Link>
      </div>
      <AdminPostList posts={posts} />
    </div>
  );
}
