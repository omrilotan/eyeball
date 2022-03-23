import { equals } from '../equals/index.js'

/**
* Create a string representation of the element's CSS selector
* @param {DOMElement} element
* @returns {string}
*/
export function querySelector (element) {
  const parts = [element.nodeName.toLowerCase()]
  const attributes = [].map.call(
    element.attributes,
    ({ name, value }) => `[${name.toLowerCase()}${equals(value)}]`
  )
  attributes.length && parts.push(attributes.join(''))
  return parts.join('')
}
