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
    subsystemname: 'TRAFFIC_LOG',
    message: 'Page requested',
    method: req.method,
    status: res.statusCode,
    path: req.path,
    user_agent: req.get('user-agent')
  }

  logger[logLevel](record)
}
