"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "タグ名は必須です"),
  slug: z.string().min(1, "スラッグは必須です").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "英小文字・数字・ハイフンのみ使えます"),
});

type FormValues = z.infer<typeof schema>;

export default function NewTagPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/tags");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-8">タグを作成</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-sm">
        <div>
          <label htmlFor="name" className="block text-sm text-zinc-600 mb-1">タグ名</label>
          <input
            id="name"
            {...register("name")}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm text-zinc-600 mb-1">スラッグ</label>
          <input
            id="slug"
            {...register("slug")}
            placeholder="my-tag"
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-zinc-900 text-white text-sm rounded hover:bg-zinc-700 disabled:opacity-50"
          >
            {isSubmitting ? "作成中..." : "作成する"}
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
    </div>
  );
}
