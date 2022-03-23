import { responseHeaders } from '../middleware/responseHeaders/index.js'
import { parseJSON } from '../middleware/parseJSON/index.js'
import { article } from './article/index.js'
import { file } from './file/index.js'
import { relay } from './relay/index.js'
import { root } from './root/index.js'

export function router (app) {
  return app
    .get('/article', responseHeaders, article)
    .get('/file/:filename', responseHeaders, file)
    .post('/relay', responseHeaders, parseJSON, relay)
    .use('*', responseHeaders, root)
}
