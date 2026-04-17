"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/api";
import type { Post, Tag } from "@/lib/types";

const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  slug: z.string().min(1, "スラッグは必須です").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "英小文字・数字・ハイフンのみ使えます"),
  body: z.string().min(1, "本文は必須です"),
  status: z.enum(["published", "draft"]),
  tags: z.array(z.number()),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  allTags: Tag[];
  post?: Post;
};

export default function PostForm({ allTags, post }: Props) {
  const router = useRouter();
  const isEdit = !!post;
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      body: post?.body ?? "",
      status: post?.status ?? "draft",
      tags: post?.tags.map((t) => t.id) ?? [],
    },
  });

  const selectedTags = useWatch({ control, name: "tags" });

  function toggleTag(id: number) {
    const current = selectedTags ?? [];
    setValue(
      "tags",
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id]
    );
  }

  async function onSubmit(data: FormValues) {
    setServerError("");
    try {
      const path = isEdit ? `/posts/${post.id}` : "/posts";
      const method = isEdit ? "PUT" : "POST";
      const body = {
        ...data,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      };
      await adminFetch(path, { method, body });
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setServerError("保存に失敗しました。入力内容を確認してください。");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label htmlFor="title" className="block text-sm text-zinc-600 mb-1">タイトル</label>
        <input
          id="title"
          {...register("title")}
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm text-zinc-600 mb-1">スラッグ</label>
        <input
          id="slug"
          {...register("slug")}
          placeholder="my-first-post"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
        {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm text-zinc-600 mb-1">本文（Markdown）</label>
        <textarea
          id="body"
          {...register("body")}
          rows={16}
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
        {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>}
      </div>

      <div>
        <span className="block text-sm text-zinc-600 mb-2">タグ</span>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1 text-xs rounded border transition-colors ${
                selectedTags?.includes(tag.id)
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "text-zinc-600 border-zinc-300 hover:border-zinc-500"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="block text-sm text-zinc-600 mb-2">ステータス</span>
        <div className="flex gap-4">
          {(["published", "draft"] as const).map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
              <input type="radio" value={s} {...register("status")} />
              {s === "published" ? "公開" : "下書き"}
            </label>
          ))}
        </div>
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-zinc-900 text-white text-sm rounded hover:bg-zinc-700 disabled:opacity-50"
        >
          {isSubmitting ? "保存中..." : isEdit ? "更新する" : "作成する"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-sm text-zinc-600 border border-zinc-300 rounded hover:border-zinc-500"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
