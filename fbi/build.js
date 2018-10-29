const getEnv = require('./helpers/env')
const lint = require('./helpers/lint')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const tsconfig = require('./configs/tsconfig')
const complier = require('./helpers/complier')

const opts = ctx.options
const src = tsconfig.compilerOptions.rootDir
const dist = tsconfig.compilerOptions.outDir

process.env.NODE_ENV = getEnv('build') || 'production'

module.exports = async function build () {
  try {
    if (opts.tslint) {
      ctx.logger.log('Start linting...')
      await lint()
      ctx.logger.info('Lint done!')
    }

    ctx.logger.log('Start cleaning up...')
    await clean(dist)
    ctx.logger.info('Clean done!')

    ctx.logger.log('Start compiling...')
    await complier(opts)
    ctx.logger.info('Complie done!')

    ctx.logger.log('Start copying...')
    await copy(src, dist, opts)
    ctx.logger.info('Copy done!')
  } catch (err) {
    console.error(err)
  }
}
