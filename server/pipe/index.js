export const pipe = ({ stream, res }) => new Promise(
  (resolve, reject) => {
    stream.on('end', resolve)
    stream.on('error', reject)
    stream.pipe(res)
  }
)
