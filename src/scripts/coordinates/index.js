export const coordinates = ({ x, y, width: w, height: h } = {}) => [x, y, w, h].every(
  n => typeof n === 'number'
)
  ? { x, y, w, h }
  : {}
