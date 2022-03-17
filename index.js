import dotenv from 'dotenv'
import { logger } from './server/logger/index.js'
import pkg from './package.json'

const { name, version } = pkg
dotenv.config()

main()
async function main () {
  const { application } = await import('./server/application/index.js')
  const app = application({ name, version })
  app.listen(3000, () => {
    logger.info('http://127.0.0.1:3000')
  })
}
