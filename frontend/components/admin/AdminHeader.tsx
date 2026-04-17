"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="border-b border-zinc-200">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin/posts" className="text-lg font-bold text-zinc-900 hover:text-zinc-600">
          MyBlog
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/admin/posts" className="text-sm text-zinc-600 hover:text-zinc-900">
            記事
          </Link>
          <Link href="/admin/posts?status=draft" className="text-sm text-zinc-600 hover:text-zinc-900">
            下書き
          </Link>
          <Link href="/admin/tags" className="text-sm text-zinc-600 hover:text-zinc-900">
            タグ
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  );
}
