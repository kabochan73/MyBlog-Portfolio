import type { Metadata } from 'next'
import './globals.css'
import Header from './_components/Header'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '技術ブログ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="flex min-h-full flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="w-full flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
