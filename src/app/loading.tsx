'use client'

import ErrorCard from '@components/ErrorCard'
import { content } from '@/data/content'
import { useLanguage } from '@/components/LanguageProvider'

export default function Loading() {
  const { language } = useLanguage()
  return <ErrorCard hand={content[language].errors.loading} />
}
