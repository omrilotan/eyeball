#!/usr/bin/env node

import babel from '@babel/core'
import path from 'path'
import fs from 'fs/promises'
import { findFiles } from './findFiles/index.js'
import { logger } from '../../server/logger/index.js'

transpile({ from: 'src/views', to: 'dist/views' })

async function transpile ({ from, to } = {}) {
  const pattern = /\.jsx?$/
  const files = await findFiles({
    file: path.join(process.cwd(), 'src'),
    pattern
  })
  let count = 0
  for (const file of files) {
    const { code, map } = await babel.transformFileAsync(
      file,
      {
        plugins: [
          ['@babel/transform-react-jsx']
        ],
        sourceMaps: true,
      }
    )
    const destination = file.replace(from, to).replace(pattern, '.js')
    const existing = await readFile(destination)
    if (existing === code) {
      continue
    }
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await Promise.all([
      [
        destination,
        [ code, `//# sourceMappingURL=${path.basename(destination)}.map` ].join('\n')
      ],
      [
        [ destination, 'map' ].join('.'),
        JSON.stringify(map)
      ]
    ].map(
      args => fs.writeFile(...args)
    ))
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
