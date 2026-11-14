'use client'

// Renders outside the layout: no Tailwind tokens guaranteed, so inline styles with token hex values. English only.
export default function GlobalError() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#fdf6ec', color: '#2b2118', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ maxWidth: 448, width: '100%', boxSizing: 'border-box', textAlign: 'center', background: '#fff', border: '2px solid #2b2118', borderRadius: 16, boxShadow: '5px 5px 0 #2b2118', padding: 32 }}>
            <p style={{ margin: 0, color: '#c2410c', fontSize: 24, fontFamily: 'cursive' }}>Oops.</p>
            <h1 style={{ fontSize: 30, fontWeight: 800, margin: '16px 0' }}>Something broke on this page.</h1>
            <button onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 12, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer', background: '#c2410c', color: '#fff' }}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  )
}
