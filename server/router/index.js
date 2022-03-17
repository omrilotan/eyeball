import { root } from './root/index.js'
import { responseHeaders } from '../middleware/responseHeaders/index.js'

export function router (app) {
  return app.use('*', responseHeaders, root)
}
