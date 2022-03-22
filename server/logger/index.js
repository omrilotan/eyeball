import { Logger } from 'consigliere'
import { LOG_LEVEL } from '../configuration/index.js'

export const logger = new Logger({ level: LOG_LEVEL })
