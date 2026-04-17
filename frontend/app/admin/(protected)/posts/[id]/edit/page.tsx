"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import type { Post, Tag } from "@/lib/types";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/posts/${id}`, {
        credentials: "include",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`).then((res) => res.json()),
    ]).then(([postData, tagsData]) => {
      setPost(postData);
      setTags(tagsData);
    });
  }, [id]);

  if (!post) return <p className="text-zinc-400">読み込み中...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-8">記事を編集</h1>
      <PostForm allTags={tags} post={post} />
    </div>
  );
}
