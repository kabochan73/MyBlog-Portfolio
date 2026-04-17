import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <Link href="/" className="text-lg font-bold text-zinc-900 hover:text-zinc-600">
          MyBlog
        </Link>
      </div>
    </header>
  );
}
