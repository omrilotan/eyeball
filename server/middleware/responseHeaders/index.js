export function responseHeaders (req, res, next) {
  res.headersSent || [
    ['service-name', 'eyeball'],
    ['route-name', getRoute(req)],
    ['custom-timestamp', Date.now()]
  ].forEach(
    (entry) => res.append(...entry)
  )

  next()
}

const getRoute = ({ baseUrl, route } = {}) => route
  ? [
      baseUrl,
      getPath(route)
    ].filter(Boolean).join('/')
  : '*'

/**
* Gets path route string or array
* @param  {Object} request path
* @return {String} Route path
*/
function getPath ({ path } = {}) {
  const value = Array.isArray(path) ? path[0] : path
  return typeof value === 'string' ? value : '*'
}
