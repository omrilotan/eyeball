import { limitSize } from '../limitSize/index.js'

/**
 * The attribute value of in the CSS selector
 * @param {string} value
 * @returns string
 */
export const equals = (value) => value
  ? `^="${limitSize(value)}"`
  : ''
