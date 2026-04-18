import Link from "next/link";
import { adminFetch, apiFetch } from "@/lib/api";
import AdminPostFilteredList from "@/components/admin/AdminPostFilteredList";
import type { Post, Tag } from "@/lib/types";

type Props = { searchParams: Promise<{ status?: string }> };

export default async function AdminPostsPage({ searchParams }: Props) {
  const { status = "" } = await searchParams;
  const params = status ? `?status=${status}` : "";

  const [posts, tags] = await Promise.all([
    adminFetch<Post[]>(`/posts${params}`, { cache: "no-store" }),
    apiFetch<Tag[]>("/tags", { cache: "no-store" }),
  ]);

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
      <AdminPostFilteredList posts={posts} tags={tags} status={status} />
    </div>
  );
}
