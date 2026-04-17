import Link from "next/link";
import type { Post } from "@/lib/types";
import TagBadge from "@/components/TagBadge";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return <p className="text-zinc-500">記事がありません。</p>;
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="border-b border-zinc-100 pb-6">
          <Link href={`/posts/${post.slug}`} className="group">
            <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600">
              {post.title}
            </h2>
          </Link>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-zinc-400">{post.published_at?.slice(0, 10)}</span>
            {post.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
