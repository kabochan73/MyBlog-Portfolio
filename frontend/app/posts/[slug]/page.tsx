import Header from "@/components/Header";
import TagBadge from "@/components/TagBadge";
import { apiFetch } from "@/lib/api";
import type { Post } from "@/lib/types";
import Markdown from "react-markdown";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await apiFetch<Post>(`/posts/${slug}`);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-zinc-900 mb-3">{post.title}</h1>
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <span className="text-xs text-zinc-400">{post.published_at?.slice(0, 10)}</span>
          {post.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
        <article className="prose prose-zinc max-w-none">
          <Markdown>{post.body}</Markdown>
        </article>
      </main>
    </>
  );
}
