export const entries = typeof Object.entries === 'function'
  ? Object.entries
  : (target) => Object.keys(target).map(
      (key) => [key, target[key]]
    )
