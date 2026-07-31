'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Route error recovered.', { message: error.message, digest: error.digest }) }, [error])
  return <section className="safe-error"><p>ROUTE UNAVAILABLE</p><h1>That signal got lost in transit.</h1><span>Nothing was changed. You can safely try this page again.</span><button onClick={reset}>TRY AGAIN</button></section>
}
