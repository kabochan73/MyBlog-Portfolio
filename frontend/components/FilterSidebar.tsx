"use client";

import type { Tag } from "@/lib/types";

type Props = {
  tags: Tag[];
  keyword: string;
  selectedTag: string;
  onKeywordChange: (v: string) => void;
  onTagChange: (slug: string) => void;
};

export default function FilterSidebar({ tags, keyword, selectedTag, onKeywordChange, onTagChange }: Props) {
  return (
    <aside className="flex-1 sticky top-6 flex flex-col gap-6">
      <div>
        <p className="text-xs text-zinc-500 mb-2">キーワード</p>
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="タイトルで絞り込む"
          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">タグ</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagChange("")}
            className={`px-3 py-1 rounded-full text-xs border ${selectedTag === "" ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-600 border-zinc-300 hover:border-zinc-500"}`}
          >
            すべて
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagChange(selectedTag === tag.slug ? "" : tag.slug)}
              className={`px-3 py-1 rounded-full text-xs border ${selectedTag === tag.slug ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-600 border-zinc-300 hover:border-zinc-500"}`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
