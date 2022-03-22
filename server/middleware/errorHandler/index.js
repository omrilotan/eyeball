import { logger } from '../../logger/index.js'

export function errorHandler (error, req, res, next) {
  const id = req.get('x-request-id')
  logger.error(error, { id })
  res.headersSent || res.append(
    'Connection', 'close'
  ).status(
    error.status || 500
  ).type(
    'html'
  ).send(
`<!DOCTYPE html>
<html>
  <head>
    <title>Internal Server Error</title>
  </head>
  <body>
    <h1 style="text-align:center;">Internal Server Error</h1>
    <hr>
    <p style="text-align:center;">The server encountered an internal error and was unable to complete your request.</p>
    <p style="text-align:center;">Error ID: ${id}</p>
  </body>
</html>`
  )
  next(error)
}
