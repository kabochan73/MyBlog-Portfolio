import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <Link href="/" className="text-3xl font-bold text-gray-900 transition-transform duration-200 inline-block hover:scale-110">
          My Blog
        </Link>
      </div>
    </header>
  )
}
