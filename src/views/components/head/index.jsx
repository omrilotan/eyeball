import React from 'react'

export function Head (props) {
  return (
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,minimum-scale=1' />
      <title>{props.title}</title>
      <link rel='icon shortcut' href='favicon.ico' type='image/x-icon' />
      {
        (props.styles ?? true) && <link rel='stylesheet' href='index.css' />
      }
      {
        props.images?.map((image) => (
          <link
            rel='preload'
            as='image'
            href={image.default}
            key={image.default}
            imagesrcset={
              Object.entries(image.sources).map(
                ([key, value]) => [value, key].join(' ')
              ).join(', ')
            }
          />
        ))
      }
    </head>
  )
}
