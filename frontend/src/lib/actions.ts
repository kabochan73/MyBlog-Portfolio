'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import * as api from '@/lib/api'

async function getToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) redirect('/admin/login')
  return token
}

// 認証
export async function loginAction(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { token } = await api.login(email, password)
    const cookieStore = await cookies()
    cookieStore.set('token', token, { httpOnly: true, path: '/' })
  } catch {
    return { error: 'メールアドレスまたはパスワードが正しくありません。' }
  }
  redirect('/admin/posts')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (token) {
    await api.logout(token).catch(() => {})
    cookieStore.delete('token')
  }
  redirect('/admin/login')
}

// 記事
export async function createPostAction(formData: FormData) {
  const token = await getToken()
  const tagIds = formData.getAll('tag_ids').map(Number)

  await api.createPost(token, {
    title: formData.get('title'),
    body: formData.get('body'),
    status: formData.get('status'),
    tag_ids: tagIds,
  })

  revalidateTag('posts', 'max')
  redirect('/admin/posts')
}

export async function updatePostAction(id: number, formData: FormData) {
  const token = await getToken()
  const tagIds = formData.getAll('tag_ids').map(Number)

  await api.updatePost(token, id, {
    title: formData.get('title'),
    body: formData.get('body'),
    status: formData.get('status'),
    tag_ids: tagIds,
  })

  revalidateTag('posts', 'max')
  redirect('/admin/posts')
}

export async function deletePostAction(id: number) {
  const token = await getToken()
  await api.deletePost(token, id)
  revalidateTag('posts', 'max')
}

// タグ
export async function createTagAction(formData: FormData) {
  const token = await getToken()

  try {
    await api.createTag(token, formData.get('name') as string)
    revalidateTag('tags', 'max')
  } catch {
    // 同名タグが存在する場合は何もしない
  }
  redirect('/admin/tags')
}

export async function deleteTagAction(id: number) {
  const token = await getToken()
  await api.deleteTag(token, id)
  revalidateTag('tags', 'max')
}
