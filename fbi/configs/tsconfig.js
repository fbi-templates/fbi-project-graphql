const path = require('path')
const deepmerge = require('deepmerge')

let userTsconfig

try {
  userTsconfig = require(path.join(process.cwd(), 'tsconfig.json'))
} catch (err) {
  userTsconfig = {}
}

const resolve = dir => path.join(process.cwd(), dir)

const baseUrl = resolve(
  userTsconfig.compilerOptions && userTsconfig.compilerOptions.rootDir
    ? userTsconfig.compilerOptions.rootDir
    : 'src'
)
const modulesPaths = process.env.NODE_PATH.split(path.delimiter)
const typesPaths = modulesPaths
  .map(p => path.join(path.relative(baseUrl, p), '@types/*'))
  .concat(['types/*'])

const tsconfig = deepmerge(userTsconfig, {
  compilerOptions: {
    target: 'es2015',
    module: 'commonjs',
    lib: ['esnext'],
    rootDir: resolve('src'),
    outDir: resolve('dist'),
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    baseUrl,
    paths: {
      '*': typesPaths
    },
    typeRoots: modulesPaths
      .map(p => path.join(p, '@types'))
      .concat(['src/types']),
    skipDefaultLibCheck: true
  },
  include: [`${baseUrl}/**/*`],
  pretty: true
})

module.exports = tsconfig
