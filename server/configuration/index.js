import dotenv from 'dotenv'

dotenv.config()

export const REQUEST_BODY_LIMIT = '300kb'
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
export const PORT = process.env.PORT || '3000'
