import path from 'path'
import express from 'express'
import parsers from 'body-parser'
import serverTiming from 'server-timing'
import { router } from '../router/index.js'
import { errorHandler } from '../middleware/errorHandler/index.js'
import { trafficLogger } from '../middleware/trafficLogger/index.js'
import { REQUEST_BODY_LIMIT as limit } from '../configuration/index.js'

const { json, text, urlencoded } = parsers
const { extname } = path

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

  app
    .use(serverTiming({ name: 'app', description: 'Application Response Time' }))
    .use(json({
      limit,
      type: ['application/json', 'application/csp-report', 'application/reports+json']
    }))
    .use(text({ limit }))
    .use(urlencoded({ extended: true }))

  const staticOptions = {
    dotfiles: 'ignore',
    etag: false,
    index: false,
    setHeaders: (res, path) => {
      if (res.headersSent) {
        return
      }
      res.set('Access-Control-Allow-Credentials', 'true')
      extname(path).match(/\.(ico|webmanifest)/) && res.set('Cache-Control', 'public, max-age=3600')
    }
  }

  app.use(express.static('public', staticOptions))
  app.use(express.static('dist/scripts', staticOptions))
  app.use(express.static('dist/styles', staticOptions))

  router(app)

  app
    .use(errorHandler)
    .use(trafficLogger)

  return app
}
