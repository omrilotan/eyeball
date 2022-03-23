import { logger } from '../../logger/index.js'

const levelMap = {
  0: 'verbose',
  1: 'verbose',
  2: 'verbose',
  3: 'verbose',
  4: 'warn',
  5: 'error'
}

export function trafficLogger (req, res, next) {
  const logLevel = levelMap[Math.floor(res.statusCode / 100)]
  const record = {
    classification: 'TRAFFIC_LOG',
    message: [req.method, req.path].join(' '),
    status: res.statusCode,
    user_agent: req.get('user-agent'),
    timeZone: req.get('cloudflare-timezone')
  }

  logger[logLevel](record)
}
