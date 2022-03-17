import path from 'path'
import fs from 'fs/promises'

const {
  access,
  readdir,
  stat,
  F_OK,
  W_OK
} = fs

export async function findFiles ({ file, pattern }) {
  const collection = []

  const exists = await access(file, F_OK | W_OK)
  if (exists) {
    return collection
  }
  const stats = await stat(file)
  if (stats.isDirectory()) {
    const ls = await readdir(file)
    for (const item of ls) {
      const result = await findFiles({
        file: path.join(file, item),
        pattern
      })
      collection.push(...result)
    }
  }
  if (file.match(pattern)) {
    collection.push(file)
  }
  return collection
}
