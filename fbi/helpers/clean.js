const rm = require('rimraf')
const { relative } = require('path')
const cwd = process.cwd()

module.exports = dir => {
  if (!dir) {
    return 'Path to remove should not be empty.'
  }
  return new Promise((resolve, reject) => {
    rm(dir, err => {
      if (err) {
        reject(err)
      }
      ctx.logger.log('clean:', relative(cwd, dir))
      resolve()
    })
  })
}
