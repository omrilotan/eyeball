import React from 'react'

export class Page extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.props.title}</h1>
        <hr />
        <figure style={{ textAlign: 'center' }}>
          <img src='https://picsum.photos/800/450' />
          <figcaption>{this.props.message}</figcaption>
        </figure>
        <script dangerouslySetInnerHTML={{ __html: 'navigator.sendBeacon(\'/v1/relay\', \'{"logs":[{"message":"Hello, Page"}]}\')' }} />
      </div>
    )
  }
}
