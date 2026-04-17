"use client";

import { useState } from "react";
import PostList from "@/components/PostList";
import FilterSidebar from "@/components/FilterSidebar";
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
