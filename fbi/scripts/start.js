const path = require('path')
const tsconfig = require('../configs/tsconfig')
const lint = require('../helpers/lint')
const options = require('../options')

try {
  require('ts-node').register(tsconfig)

  if (options.tslint) {
    lint()
  }

  require(path.join(process.cwd(), 'src/index.ts'))
} catch (err) {
  console.log(err)
}
