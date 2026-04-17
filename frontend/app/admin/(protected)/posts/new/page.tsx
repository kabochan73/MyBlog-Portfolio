"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/admin/PostForm";
import type { Tag } from "@/lib/types";

export default function NewPostPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
      .then((res) => res.json())
      .then(setTags);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-8">記事を作成</h1>
      <PostForm allTags={tags} />
    </div>
  );
}
