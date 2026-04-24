import type { Post, Tag } from '@/types'

const BASE_URL =
  typeof window === 'undefined'
    ? (process.env.API_URL ?? 'http://nginx')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080')

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { headers: optionHeaders, ...restOptions } = options ?? {}
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((optionHeaders as Record<string, string>) ?? {}),
    },
    ...restOptions,
  })
  if (!res.ok) throw res
  if (res.status === 204) return undefined as T
  return res.json()
}

// 公開API
export const getPosts = (params?: { keyword?: string; tag?: string }) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params ?? {}).filter(([, v]) => v))
  ).toString()
  return request<Post[]>(`/posts${query ? `?${query}` : ''}`, {
    next: { tags: ['posts'] },
  })
}

export const getPost = (slug: string) =>
  request<Post>(`/posts/${slug}`, { next: { tags: ['posts'] } })

export const getTags = () =>
  request<Tag[]>('/tags', { next: { tags: ['tags'] } })

// 管理者API
export const login = (email: string, password: string) =>
  request<{ token: string }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const logout = (token: string) =>
  request<void>('/admin/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })

export const adminGetPosts = (token: string) =>
  request<Post[]>('/admin/posts', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

export const adminGetPost = (token: string, id: number) =>
  request<Post>(`/admin/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

export const createPost = (token: string, data: object) =>
  request<Post>('/admin/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
  })

export const updatePost = (token: string, id: number, data: object) =>
  request<Post>(`/admin/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
  })

export const deletePost = (token: string, id: number) =>
  request<void>(`/admin/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

export const createTag = (token: string, name: string) =>
  request<Tag>('/admin/tags', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteTag = (token: string, id: number) =>
  request<void>(`/admin/tags/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
