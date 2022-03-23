/**
 * @param {string} String to limit its length
 * @param {number} [maxLength=20] Maximum length
 * @returns {string} Possibly concatenated string
 */
export const limitSize = (string, maxLength = 20) => string.length > maxLength
  ? string.substring(0, maxLength)
  : string
