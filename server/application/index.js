import express from 'express'
import serverTiming from 'server-timing'
import { router } from '../router/index.js'
import { errorHandler } from '../middleware/errorHandler/index.js'
import { trafficLogger } from '../middleware/trafficLogger/index.js'

export function application (props = {}) {
  const app = express()

  Object.entries(
    Object.assign(
      {
        'x-powered-by': false,
        etag: false,
        start: new Date().toUTCString()
      },
      props
    )
  ).forEach(
    ([key, value]) => app.set(key, value)
  )

  app.use(serverTiming({ name: 'app', description: 'Application Response Time' }))

  return router(app).use(errorHandler).use(trafficLogger)
}
