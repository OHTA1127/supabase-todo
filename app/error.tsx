//errorコンポーネントはclient componentにする必要がある
'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p className="mt-6 text-center text-red-500">
        Data fetching in sever failed
      </p>
    </div>
  )
}
