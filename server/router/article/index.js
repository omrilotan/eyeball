import ReactDOMServer from 'react-dom/server.js'
import wait from '@lets/wait'
import { pipe } from '../../pipe/index.js'
import { Article } from '../../../dist/views/article/index.js'
import { Head } from '../../../dist/views/components/head/index.js'

export async function article (req, res, next) {
  const title = 'This is the title'
  const message = 'This is the message'
  const style = { width: '100%', aspectRatio: '5/2' }

  const image = {
    default: 'file/gHszhNtrXOH62slJfkZ60ICk17SxHGmL-ld.jpeg',
    style: { width: '100%', aspectRatio: '5/2' },
    alt: 'This is a pretty large image',
    sources: {
      '480w': 'file/gHszhNtrXOH62slJfkZ60ICk17SxHGmL-ld.jpeg',
      '800w': 'file/gHszhNtrXOH62slJfkZ60ICk17SxHGmL-hd.jpeg'
    },
    sizes: '(max-width: 600px) 100vw, 800px'
  }
  const head = ReactDOMServer.renderToStaticMarkup(Head({ title, images: [image] }))

  res.write([
    '<!DOCTYPE html>\n<html>',
    head,
    '<body>'
  ].join('\n'))

  const body = new Article({ title, message, style, image }).render()

  res.write('<h2>Chunk 1</h2>')
  await wait(1000)
  res.write('<h2>Chunk 2</h2>')
  await wait(1000)

  await pipe({
    res,
    stream: ReactDOMServer.renderToNodeStream(body)
  })

  res.write(['</body>', '</html>'].join('\n'))
  res.status(200).end()
  next()
}
