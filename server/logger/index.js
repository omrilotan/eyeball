import { Logger } from 'consigliere'

const { LOG_LEVEL } = process.env
export const logger = new Logger({ level: LOG_LEVEL })
