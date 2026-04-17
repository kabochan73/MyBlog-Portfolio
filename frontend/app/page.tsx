import { apiFetch } from "@/lib/api";

type HealthResponse = {
  status: string;
};

export default async function Home() {
  let status = "接続失敗";

  try {
    const data = await apiFetch<HealthResponse>("/health");
    status = data.status;
  } catch {
    // バックエンドが起動していない場合
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">MyBlog Portfolio</h1>
        <p className="text-zinc-600">
          API ステータス:{" "}
          <span className={status === "ok" ? "text-green-600" : "text-red-600"}>
            {status}
          </span>
        </p>
      </div>
    </main>
  );
}
