const globby = require('globby')
const { join, relative } = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()

module.exports = async (src, dist, opts) => {
  const others = await globby('**', {
    cwd: src,
    dot: true,
    nodir: true,
    ignore: opts.copy.ignore || [
      '**/*.{js,ts}',
      '.DS_Store',
      'configs/pm2-*.json'
    ]
  })

  await Promise.all(
    others.map(async item => {
      await fs.copy(join(src, item), join(dist, item))
      ctx.logger.log(
        'copy:',
        relative(cwd, join(src, item)),
        '-->',
        relative(cwd, join(dist, item))
      )
    })
  )

  // env config file
  const configPath = join(src, `configs/pm2-${process.env.NODE_ENV}.json`)
  const configDistPath = join(dist, 'pm2.json')
  const configsExist = await fs.pathExists(configPath)
  if (configsExist) {
    await fs.copy(configPath, configDistPath)
    ctx.logger.log(
      'copy:',
      relative(cwd, configPath),
      '-->',
      relative(cwd, configDistPath)
    )
  }

  // package.json
  if (opts.copy['package.json']) {
    const pkgPath = 'package.json'
    const pkgDistPath = join(dist, 'package.json')
    const pkgsExist = await fs.pathExists(pkgPath)
    if (pkgsExist) {
      const pkg = require(join(process.cwd(), pkgPath))
      delete pkg.devDependencies
      await fs.outputJson(pkgDistPath, pkg, {
        spaces: '  '
      })
      ctx.logger.log('copy:', pkgPath, '-->', relative(cwd, pkgDistPath))
    }
  }

  // node_modules
  if (opts.copy['node_modules']) {
    const nmPath = 'node_modules'
    const nmDistPath = join(dist, 'node_modules')
    const nmsExist = await fs.pathExists(nmPath)
    if (nmsExist) {
      await fs.copy(nmPath, nmDistPath)
      ctx.logger.log('copy:', nmPath, '-->', relative(cwd, nmDistPath))
    }
  }
}
