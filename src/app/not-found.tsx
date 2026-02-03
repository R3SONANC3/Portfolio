import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="text-gray-500 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="px-6 py-2 text-white transition bg-black rounded-xl hover:opacity-80 dark:bg-white dark:text-black"
      >
        Go back home
      </Link>
    </div>
  )
}
