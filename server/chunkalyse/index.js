/**
 * @param {array} array
 * @param {number} [parts=10]
 * @returns {array[]}
 */
export const chunkalyse = (array, parts = 10, length = array.length / parts) => array.reduce(
  (accumulator, item, index) => {
    const chunkIndex = Math.floor(index / length)
    if (!accumulator[chunkIndex]) {
      accumulator[chunkIndex] = []
    }
    accumulator[chunkIndex].push(item)
    return accumulator
  },
  []
)
