#!/usr/bin/env node

import esbuild from 'esbuild'
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
    const content = await fs.readFile(file, 'utf8')
    const { code, map } = await esbuild.transform(content, {
      format: 'esm',
      loader: 'jsx',
      treeShaking: true,
      sourcemap: true
    })

    const destination = file.replace(from, to).replace(pattern, '.js')
    const output = [code, `//# sourceMappingURL=${path.basename(destination)}.map`].join('\n')
    const mapDestination = [destination, 'map'].join('.')
    const pairs = [
      [destination, output],
      [mapDestination, map]
    ]

    let same = true
    for (const [destination, content] of pairs) {
      if (await readFile(destination) !== content) {
        same = false
      }
    }

    if (same) continue
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await Promise.all(pairs.map(
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
