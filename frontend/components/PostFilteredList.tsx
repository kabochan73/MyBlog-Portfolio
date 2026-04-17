"use client";

import { useState } from "react";
import PostList from "@/components/PostList";
import type { Post, Tag } from "@/lib/types";

type Props = {
  posts: Post[];
  tags: Tag[];
};

export default function PostFilteredList({ posts, tags }: Props) {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filtered = posts.filter((post) => {
    const matchesKeyword = keyword === "" || post.title.toLowerCase().includes(keyword.toLowerCase());
    const matchesTag = selectedTag === "" || post.tags.some((t) => t.slug === selectedTag);
    return matchesKeyword && matchesTag;
  });

  return (
    <div className="flex gap-8">
      <div className="flex-3 min-w-0">
        <PostList posts={filtered} />
      </div>
      <aside className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワード検索"
          className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full border border-zinc-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          <option value="">すべてのタグ</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.slug}>
              {tag.name}
            </option>
          ))}
        </select>
      </aside>
    </div>
  );
}
