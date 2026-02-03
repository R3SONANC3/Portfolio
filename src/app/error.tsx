'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <h2 className="text-2xl font-semibold text-red-500">
        Something went wrong 😢
      </h2>

      <p className="text-gray-500 dark:text-gray-400">
        An unexpected error has occurred. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-2 text-white transition bg-black rounded-xl hover:opacity-80 dark:bg-white dark:text-black"
      >
        Try again
      </button>
    </div>
  )
}
