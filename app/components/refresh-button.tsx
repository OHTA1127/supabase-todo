'use client'

import { useRouter } from 'next/navigation'

export const RefreshuBtn = () => {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
      onClick={() => {
        // スーパーリロードしなくても最新のDBの内容を反映させるボタン
        router.refresh()
      }}
    >
      Refresh current route
    </button>
  )
}
