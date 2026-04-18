"use client";

import { useState } from "react";
import AdminPostList from "@/components/admin/AdminPostList";
import FilterSidebar from "@/components/FilterSidebar";
import type { Post, Tag } from "@/lib/types";

type Props = {
  posts: Post[];
  tags: Tag[];
  status: string;
};

export default function AdminPostFilteredList({ posts, tags, status }: Props) {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filtered = posts.filter((p) => {
    const matchStatus = status === "draft" ? p.status === "draft" : p.status === "published";
    const matchKeyword = keyword === "" || p.title.toLowerCase().includes(keyword.toLowerCase());
    const matchTag = selectedTag === "" || p.tags.some((t) => t.slug === selectedTag);
    return matchStatus && matchKeyword && matchTag;
  });

  return (
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
  );
}
