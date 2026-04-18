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
  headers?: Record<string, string>;
  cache?: RequestCache;
};

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, method = "GET", body, credentials, headers: extraHeaders, cache } = options;

  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    method,
    credentials,
    headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...extraHeaders },
    body: body ? JSON.stringify(body) : undefined,
    ...(cache ? { cache } : {}),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

const ADMIN_API_URL =
  typeof window === "undefined"
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

type AdminFetchOptions = {
  method?: string;
  body?: unknown;
  cache?: RequestCache;
};

export async function adminFetch<T = void>(path: string, options: AdminFetchOptions = {}): Promise<T> {
  const { method = "GET", body, cache } = options;

  let token: string | undefined;
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("admin_token")?.value;
  } else {
    const raw = document.cookie.split("; ").find((r) => r.startsWith("admin_token="))?.split("=").slice(1).join("=");
    token = raw ? decodeURIComponent(raw) : undefined;
  }

  const res = await fetch(`${ADMIN_API_URL}/admin${path}`, {
    method,
    headers: {
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(cache ? { cache } : {}),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}
