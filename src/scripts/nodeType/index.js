/* eslint-env browser */

import { entries } from '../entries/index.js'

/**
 * Get the node type name of the element
 * @param {DOMElement} element
 * @returns {string?}
 */
export const nodeType = (element) => typeof element.nodeType === 'number'
  ? entries(Node).find(([, enumerator]) => enumerator === element.nodeType)[0]
  : undefined
