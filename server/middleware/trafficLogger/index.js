import { logger } from '../../logger/index.js'

const levelMap = {
  '0': 'info',
  '1': 'info',
  '2': 'info',
  '3': 'info',
  '4': 'warn',
  '5': 'error'
}

export function trafficLogger(req, res, next) {
  const logLevel = levelMap[Math.floor(res.statusCode / 100)]
  const record = {
    message: 'traffic log',
    method: req.method,
    status: res.statusCode,
    path: req.path,
    user_agent: req.get('user-agent'),
    headers: res.getHeaders()
  };

  logger[logLevel](record)
}
