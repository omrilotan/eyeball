import React from 'react'
import { Image } from '../components/image/index.js'

export class Article extends React.Component {
  render () {
    return (
      <main>
        <header>👟 Last Lap</header>
        <h1>{this.props.title}</h1>
        <hr />
        <figure>
          {Image(this.props)}
          <figcaption>{this.props.message}</figcaption>
        </figure>
        <script dangerouslySetInnerHTML={{ __html: 'navigator.sendBeacon(\'/relay\', \'{"logs":[{"classification":"PAGE_VIEW","message":"article"}]}\')' }} />
        <script src='index.js' type='module' />
      </main>
    )
  }
}
