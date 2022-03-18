import { logger } from '../../logger/index.js'

export function relay(req, res, next) {
  res.status(201)
  res.end()
}
