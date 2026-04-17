import type { Tag } from "@/lib/types";

type Props = {
  tag: Tag;
};

export default function TagBadge({ tag }: Props) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs text-zinc-600 bg-zinc-100 rounded">
      {tag.name}
    </span>
  );
}
