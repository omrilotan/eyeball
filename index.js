import { logger } from './server/logger/index.js'
import { PORT } from './server/configuration/index.js'

process.on('unhandledRejection', error => logger.error(error));
process.on('uncaughtException', error => logger.error(error));

['stdout', 'stderr'].forEach(type => {
  const stream = process[type].write.bind(process[type])
  process[type].write = (...args) => {
    try {
      const [first] = args
      if (typeof first === 'string' && first.startsWith('{')) {
        return stream(...args)
      }
      return stream(JSON.stringify({
        log: args.join(', '),
        level: type === 'stdout' ? 'info' : 'error'
      }))
    } catch (error) {
      return stream(...args)
    }
  }
})

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
