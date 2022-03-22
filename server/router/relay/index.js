import { logger } from '../../logger/index.js'
import { requestMetadata } from '../../requestMetadata/index.js'

export function relay (req, res, next) {
  const metadata = Object.assign(
    requestMetadata(req),
    req.body?.metadata?.toString?.() === '[object Object]'
      ? req.body.metadata
      : {}
  )
  req.body?.logs?.forEach(
    log => logger[log.level || 'verbose'](log, metadata)
  )
  res.status(201)
  res.end()
}
