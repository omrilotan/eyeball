#!/usr/bin/env node

import babel from '@babel/core'
import path from 'path'
import fs from 'fs/promises'
import { findFiles } from './findFiles/index.js'
import { logger } from '../../server/logger/index.js'

build()

async function build () {
  const files = await findFiles({
    file: path.join(process.cwd(), 'src'),
    pattern: /\.jsx$/
  })
  let count = 0
  for (const file of files) {
    const { code } = await babel.transformFileAsync(
      file, {
        plugins: [
          ['@babel/transform-react-jsx']
        ]
      }
    )
    const destination = file.replace('src/views', 'dist/views').replace(/\.jsx$/, '.js')
    const existing = await readFile(destination)
    if (existing === code) {
      continue
    }
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.writeFile(destination, code)
    count++
  }
  count && logger.info(`${count} files prepared`)
}

async function readFile (file) {
  try {
    const data = await fs.readFile(file)
    return data.toString()
  } catch (error) {
    return ''
  }
}
