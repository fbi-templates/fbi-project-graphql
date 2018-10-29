const path = require('path')
const nodemon = require('nodemon')
const tsconfig = require('./configs/tsconfig')

process.env.NODE_ENV = 'development'
const opts = ctx.options

module.exports = async () => {
  const startScript = path.join(__dirname, './scripts/start')

  nodemon({
    watch: [tsconfig.compilerOptions.rootDir],
    exec: `node ${opts.nodemon.inspect ? '--inspect' : ''} ${startScript}`,
    ...opts.nodemon
  })
}
