'use client'

import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('Application boundary recovered from an error.', { error, componentStack: info.componentStack }) }
  render() {
    if (this.state.hasError) return <section className="safe-error"><p>CONNECTION INTERRUPTED</p><h1>We hit a small cosmic glitch.</h1><span>Your information is safe. Try loading this view again.</span><button onClick={() => this.setState({ hasError: false })}>TRY AGAIN</button></section>
    return this.props.children
  }
}
