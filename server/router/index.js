import { responseHeaders } from '../middleware/responseHeaders/index.js'
import { parseJSON } from '../middleware/parseJSON/index.js'
import { relay } from './relay/index.js'
import { root } from './root/index.js'

export function router (app) {
  return app
    .post('/v1/relay', responseHeaders, parseJSON, relay)
    .use('*', responseHeaders, root)
}
