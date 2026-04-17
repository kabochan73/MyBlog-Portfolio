"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("メールアドレスまたはパスワードが正しくありません。");
        return;
      }

      router.push("/admin/posts");
    } catch {
      setError("ログインに失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-zinc-900 mb-6">管理者ログイン</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-zinc-600 mb-1">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-zinc-600 mb-1">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white text-sm py-2 rounded hover:bg-zinc-700 disabled:opacity-50"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </main>
  );
}
