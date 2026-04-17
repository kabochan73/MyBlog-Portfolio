// サーバーサイド: Docker内のNginxサービス名で通信
// クライアントサイド: ブラウザからlocalhost:8000で通信
const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = {
  params?: Record<string, string>;
  method?: string;
  body?: unknown;
  credentials?: RequestCredentials;
};

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, method = "GET", body, credentials } = options;

  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    method,
    credentials,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
