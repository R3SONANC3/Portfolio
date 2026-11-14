'use client'

import { useEffect } from 'react'
import ErrorCard, { errorBtn } from '@components/ErrorCard'
import { content } from '@/data/content'
import { useLanguage } from '@/components/LanguageProvider'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Route error recovered.', { message: error.message, digest: error.digest }) }, [error])
  const t = content[useLanguage().language].errors
  return (
    <ErrorCard hand={t.hand} title={t.errorTitle}>
      <button onClick={reset} className={errorBtn}>{t.errorBtn}</button>
    </ErrorCard>
  )
}
