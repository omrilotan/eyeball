import fs from 'fs/promises'
import path from 'path'
import wait from '@lets/wait'
import { chunkalyse } from '../../chunkalyse/index.js'

export async function file (req, res, next) {
  try {
    const {
      params: {
        filename
      } = {},
      query: {
        delay,
        beats
      } = {}
    } = req
    const data = await fs.readFile(
      path.join(
        process.cwd(),
        'public/files',
        filename
      )
    )
    const _delay = Number(delay) || 1000
    const _beats = Number(beats) || 20
    const chunks = chunkalyse(data, _beats)
    for (const chunk of chunks) {
      await wait(_delay / chunks.length)
      res.write(
        Buffer.from(chunk)
      )
    }
    res.end()
  } catch (error) {
    error.description = 'File not found'
    error.code = 404
    next(error)
  }
}
