'use client'

export default function GlobalError() {
  return <html lang="en"><body style={{ margin: 0, background: '#080916', color: '#f5f6ff', fontFamily: 'Arial, sans-serif' }}><main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}><div><p style={{ color: '#7bf3ff', fontSize: 12, fontWeight: 800, letterSpacing: '0.16em' }}>SYSTEM SAFE MODE</p><h1>We couldn’t load this view.</h1><p style={{ color: '#aeb4c9' }}>Please refresh the page or come back in a moment.</p><button onClick={() => window.location.reload()} style={{ marginTop: 16, border: 0, borderRadius: 10, padding: '12px 16px', fontWeight: 800, cursor: 'pointer' }}>REFRESH PAGE</button></div></main></body></html>
}
