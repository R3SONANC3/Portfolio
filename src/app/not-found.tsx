import Link from 'next/link'
import ErrorCard, { errorBtn } from '@components/ErrorCard'
import { content } from '@/data/content'

export default function NotFound() {
  const t = content.en.errors
  return (
    <ErrorCard hand={t.hand} title={t.notFoundTitle}>
      <Link href="/" className={errorBtn}>{t.notFoundBtn}</Link>
    </ErrorCard>
  )
}
