import React from 'react'

export function Image ({ image }) {
  if (typeof image === 'string') {
    return <img src={image} />
  }

  const attributes = {}
  attributes.src = image.default || Object.values(image.sources).pop()
  attributes.srcSet = Object.entries(image.sources).map(
    ([key, value]) => [value, key].join(' ')
  ).join(', ')
  attributes.style = image.style
  attributes.alt = image.alt
  attributes.sizes = image.sizes
  attributes.elementtiming = 'image'

  return <img {...attributes} />
}
