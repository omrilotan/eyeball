import { Logger } from 'consigliere'
import { LOG_LEVEL, PRETTY_LOGS } from '../configuration/index.js'

export const logger = new Logger({ level: LOG_LEVEL, space: PRETTY_LOGS ? 2 : undefined })
