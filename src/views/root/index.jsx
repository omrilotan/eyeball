import React from 'react'
import { Head } from '../components/head/index.js'

export function App () {
  const title = '403 Forbidden'

  return (
    <html>
      {Head({ title, styles: false })}
      <body>
        <h1 style={{ textAlign: 'center' }}>403 Forbidden</h1>
        <hr />
        <p style={{ textAlign: 'center' }}>cloudflare-nginx</p>
        <script dangerouslySetInnerHTML={{ __html: 'navigator.sendBeacon(\'/relay\', \'{"logs":[{"classification":"PAGE_VIEW","message":"root"}]}\')' }} />
      </body>
    </html>
  )
}
