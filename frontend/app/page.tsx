import Header from "@/components/Header";
import PostFilteredList from "@/components/PostFilteredList";
import { apiFetch } from "@/lib/api";
import type { Post, Tag } from "@/lib/types";

export default async function Home() {
  const [posts, tags] = await Promise.all([
    apiFetch<Post[]>("/posts", { cache: "force-cache" }),
    apiFetch<Tag[]>("/tags", { cache: "force-cache" }),
  ]);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">
        <PostFilteredList posts={posts} tags={tags} />
      </main>
    </>
  );
}
