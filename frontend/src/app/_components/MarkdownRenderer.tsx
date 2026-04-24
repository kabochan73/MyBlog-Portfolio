'use client'

import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
