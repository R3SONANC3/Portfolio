'use client'

import React from 'react'
import ErrorCard, { errorBtn } from '@components/ErrorCard'
import { content } from '@/data/content'
import { useLanguage } from '@/components/LanguageProvider'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

function Fallback({ retry }: { retry: () => void }) {
  const t = content[useLanguage().language].errors
  return (
    <ErrorCard hand={t.hand} title={t.errorTitle}>
      <button onClick={retry} className={errorBtn}>{t.errorBtn}</button>
    </ErrorCard>
  )
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('Application boundary recovered from an error.', { error, componentStack: info.componentStack }) }
  render() {
    if (this.state.hasError) return <Fallback retry={() => this.setState({ hasError: false })} />
    return this.props.children
  }
}
