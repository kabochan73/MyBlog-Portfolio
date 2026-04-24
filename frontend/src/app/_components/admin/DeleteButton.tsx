'use client'

import { deletePostAction } from '@/lib/actions'

type Props = {
  id: number
}

export default function DeleteButton({ id }: Props) {
  const action = deletePostAction.bind(null, id)

  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('本当に削除しますか？')) e.preventDefault()
        }}
        className="text-sm text-red-600 hover:underline"
      >
        削除
      </button>
    </form>
  )
}
