'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <header className="border-b border-gray-400 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <Link href="/" className="text-3xl font-bold text-gray-900 transition-transform duration-200 inline-block hover:scale-110">
          My Blog
        </Link>
      </div>
    </header>
  )
}
