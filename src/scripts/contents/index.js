/* eslint-env browser */

import { querySelector } from '../querySelector/index.js'

/**
 * Create a string representation of the element's content
 * @param {DOMElement} element
 * @returns {string} String descriptor of the rectangle
 */
export function contents (element) {
  if (typeof element.nodeName !== 'string') {
    return ''
  }
  if (element.nodeType === Node.TEXT_NODE) {
    return element.nodeValue
  }
  return querySelector(element)
}
