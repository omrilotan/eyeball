/**
 * Add commas to numbers
 * @param {number}
 * @return {string}
 */
export const commas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
