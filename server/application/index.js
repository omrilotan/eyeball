import express from 'express'
import { router } from '../router/index.js'
import { errorHandler } from '../middleware/errorHandler/index.js'

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

  return router(app).use(errorHandler)
}
