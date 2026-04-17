"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminPostList from "@/components/admin/AdminPostList";
import { adminFetch, apiFetch } from "@/lib/api";
import FilterSidebar from "@/components/FilterSidebar";
import type { Post, Tag } from "@/lib/types";

export default function AdminPostsPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const params = status ? `?status=${status}` : "";
    adminFetch<Post[]>(`/posts${params}`).then(setPosts).catch(console.error);
    apiFetch<Tag[]>("/tags").then(setTags).catch(console.error);
  }, [status]);

  const filtered = posts.filter((p) => {
    const matchKeyword = keyword === "" || p.title.toLowerCase().includes(keyword.toLowerCase());
    const matchTag = selectedTag === "" || p.tags.some((t) => t.slug === selectedTag);
    return matchKeyword && matchTag;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
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
      <div className="flex gap-8 items-start">
        <div className="flex-3 min-w-0">
          <AdminPostList posts={filtered} />
        </div>
        <FilterSidebar
          tags={tags}
          keyword={keyword}
          selectedTag={selectedTag}
          onKeywordChange={setKeyword}
          onTagChange={setSelectedTag}
        />
      </div>
    </div>
  );
}
