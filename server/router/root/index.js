import ReactDOMServer from 'react-dom/server.js'
import { App } from '../../../dist/views/root/index.js'

export function root (req, res, next) {
  const stream = ReactDOMServer.renderToNodeStream(App())
  es.status(403)
  res.write('<!DOCTYPE html>\n')
  stream.on('end', next)
  stream.pipe(res)
}
