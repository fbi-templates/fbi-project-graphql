const path = require('path')
const globby = require('globby')
const ts = require('typescript')
const tsconfig = require('../configs/tsconfig')

function compile (fileNames, options) {
  const program = ts.createProgram(fileNames, options)
  const emitResult = program.emit()

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      )
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      const relativeFilePath = path.relative(
        process.cwd(),
        diagnostic.file.fileName
      )
      ctx.logger.error(`${relativeFilePath} (${line + 1},${character + 1}): `)
      ctx.logger.warn(message)
    } else {
      ctx.logger.error(
        `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
      )
    }
  })

  if (emitResult.emitSkipped) {
    process.exit(emitResult.emitSkipped)
  }
}

module.exports = async opts => {
  const files = await globby('**/*.ts', {
    cwd: tsconfig.compilerOptions.rootDir,
    dot: true,
    nodir: true,
    ignore: opts.build.ignore || []
  })

  const { options, errors } = ts.convertCompilerOptionsFromJson(
    tsconfig.compilerOptions
  )

  if (errors.length) {
    ctx.logger.error(errors.join('\n'))
    process.exit(1)
  }

  compile(files.map(f => path.join('src', f)), options)
}
