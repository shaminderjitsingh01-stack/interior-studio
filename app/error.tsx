'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '800px', margin: '4rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Something went wrong</h2>
      <p style={{ color: '#c00', marginBottom: '1rem' }}>{error.message}</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '12px' }}>
        {error.stack}
      </pre>
      <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Try again
      </button>
    </div>
  )
}
