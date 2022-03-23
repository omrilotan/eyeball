#!/usr/bin/env node

import path from 'path'
import fs from 'fs/promises'
import esbuild from 'esbuild'
import sass from 'node-sass'
import { findFiles } from './findFiles/index.js'
import { logger } from '../../server/logger/index.js'

scripts({ from: 'src', to: 'dist' })
styles({ from: 'src', to: 'dist' })

async function styles ({ from, to } = {}) {
  const pattern = /\.s?css$/
  const files = await findFiles({
    file: path.join(process.cwd(), from),
    pattern
  })
  for (const file of files) {
    const content = await sassRender(file)
    const destination = file.replace(from, to).replace(pattern, '.css')
    if (await readFile(destination) === content) {
      continue
    }
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.writeFile(destination, content)
  }
}

const sassRender = file => new Promise(
  (resolve, reject) => {
    sass.render(
      {
        file
        // outputStyle: 'compressed'
      },
      (err, result) => err
        ? reject(err)
        : resolve(result.css.toString())
    )
  }
)

async function scripts ({ from, to } = {}) {
  const pattern = /\.jsx?$/
  const files = await findFiles({
    file: path.join(process.cwd(), from),
    pattern
  })
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
  }
}

async function readFile (file) {
  try {
    const data = await fs.readFile(file)
    return data.toString()
  } catch (error) {
    return ''
  }
}
