import Link from "next/link";
import { apiFetch } from "@/lib/api";
import TagList from "@/components/admin/TagList";
import type { Tag } from "@/lib/types";

export default async function AdminTagsPage() {
  const tags = await apiFetch<Tag[]>("/tags", { cache: "no-store" });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-zinc-900">タグ管理</h1>
        <Link href="/admin/tags/new" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-700">
          新規作成
        </Link>
      </div>
      <TagList initialTags={tags} />
    </div>
  );
}
