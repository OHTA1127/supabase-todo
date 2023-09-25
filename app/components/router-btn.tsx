'use client'

import { useRouter } from 'next/navigation'

//propsで遷移先のURLを受け取る
export default function RouterBtn({
  destination = '',
}: {
  destination?: string
}) {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
      onClick={() => {
        router.push(`/${destination}`)
      }}
    >
      Nav to {destination ? destination : 'home'}
    </button>
  )
}
