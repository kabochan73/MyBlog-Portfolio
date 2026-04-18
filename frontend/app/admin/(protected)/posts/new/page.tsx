import PostForm from "@/components/admin/PostForm";
import { apiFetch } from "@/lib/api";
import type { Tag } from "@/lib/types";

export default async function NewPostPage() {
  const tags = await apiFetch<Tag[]>("/tags", { cache: "no-store" });

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-8">記事を作成</h1>
      <PostForm allTags={tags} />
    </div>
  );
}
