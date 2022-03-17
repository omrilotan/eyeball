import dotenv from 'dotenv'
import { logger } from './server/logger/index.js'
dotenv.config()

const { PORT = '3000' } = process.env

main()
async function main () {
  try {
    const { application } = await import('./server/application/index.js')
    const app = application()
    app.listen(
      PORT,
      () => logger.info(`http://127.0.0.1:${PORT}`)
    )
  } catch (error) {
    logger.error(error)
  }
}
