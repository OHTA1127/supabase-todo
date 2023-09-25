'use client'

import { useEffect, useState } from 'react'

export default function TimerCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCount((prevCount) => prevCount + 1), 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>{count}</p>
      <p>
        <button
          className="font-sm rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700"
          onClick={() => setCount(0)}
        >
          reset
        </button>
      </p>
    </div>
  )
}
