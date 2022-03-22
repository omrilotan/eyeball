import React from 'react'

export function App () {
  return (
    <html>
      <head>
        <title>403 Forbidden</title>
      </head>
      <div>
        <h1 style={{ textAlign: 'center' }}>403 Forbidden</h1>
        <hr />
        <p style={{ textAlign: 'center' }}>cloudflare-nginx</p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: 'navigator.sendBeacon(\'/v1/relay\', \'{"logs":[{"message":"Hello, Page"}]}\')' }} />
    </html>
  )
}
