export function responseHeaders (req, res, next) {
  res.headersSent || [
    ['custom-timestamp', Date.now()]
  ].forEach(
    (entry) => res.append(...entry)
  )
  next()
}
