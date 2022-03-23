
import { contents } from '../contents/index.js'
import { nodeType } from '../nodeType/index.js'
/**
 * @param {DOMElement} element
 * @returns {string} String descriptor of the rectangle
 */
export function describe ({ element, target }) {
  if (target) { return target }
  if (!element) { return }
  if (typeof element === 'string') { return element }
  try {
    return [
      nodeType(element),
      contents(element)
    ].filter(Boolean).join(' ') || `${element}`
  } catch (error) {
    // Fallback to simple string representation
    return `${element}`
  }
}
