/**
 * Check navigator.sendBeacon POST with JSON sent as text/plain
 * @param {Request} req
 * @returns {boolean}
 */
const isBeacon = (req) =>
  req.method === 'POST' &&
  req.is('text') &&
  req.body.startsWith?.('{')

export function parseJSON (req, res, next) {
  try {
    if (req.is('json')) {
      next()
      return
    }

    if (isBeacon(req)) {
      try {
        const data = JSON.parse(req.body)
        req.body = data
      } catch ({ message }) {
        next(new Error(`Could not parse beacon data: ${message}`))
        return
      }
    }

    if (req.get('content-type')?.toLowerCase() === 'application/reports+json') {
      if (typeof req.body === 'string') {
        try {
          const data = JSON.parse(req.body)
          req.body = data
        } catch ({ message }) {
          next(new Error(`Could not parse body as JSON: ${message}`))
          return
        }
      }
    }
  } catch (error) {
    // ignore
  }
  next()
}
