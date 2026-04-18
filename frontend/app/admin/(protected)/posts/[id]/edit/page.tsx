import PostForm from "@/components/admin/PostForm";
import { adminFetch, apiFetch } from "@/lib/api";
import type { Post, Tag } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const [post, tags] = await Promise.all([
    adminFetch<Post>(`/posts/${id}`, { cache: "no-store" }),
    apiFetch<Tag[]>("/tags", { cache: "no-store" }),
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-8">記事を編集</h1>
      <PostForm allTags={tags} post={post} />
    </div>
  );
}
