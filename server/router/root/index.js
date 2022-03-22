import ReactDOMServer from 'react-dom/server.js'
import { App } from '../../../dist/views/root/index.js'

export function root (req, res, next) {
  if (res.finished || res.destroyed) {
    return next()
  }

  const stream = ReactDOMServer.renderToNodeStream(App())
  res.status(403)
  res.write('<!DOCTYPE html>\n')
  stream.on('end', next)
  stream.pipe(res)
}
