import ReactDOMServer from 'react-dom/server.js'
import { Page } from '../../../dist/views/article/index.js'

export function article (req, res, next) {
  const title = 'This is the title'
  const message = 'This is the message'

  const page = new Page({ title, message }).render()
  const stream = ReactDOMServer.renderToNodeStream(page)
  res.status(200)
  res.write([
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    `  <title>${title}</title>`,
    '</head>'
  ].join('\n'))

  stream.on('end', () => {
    res.write('</html>\n')
    res.end()
    next()
  })
  stream.pipe(res)
}
