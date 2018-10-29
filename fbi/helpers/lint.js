const { Linter, Configuration } = require('tslint')
const tsconfig = require('../configs/tsconfig')

module.exports = async () => {
  const project = tsconfig.compilerOptions.rootDir
  const format = 'stylish'
  const configFile = 'tslint.json'

  const options = {
    fix: false,
    formatter: format
  }

  const program = Linter.createProgram('tsconfig.json', project)
  const linter = new Linter(options, program)
  const files = Linter.getFileNames(program)

  files.forEach(file => {
    const fileContents = program.getSourceFile(file).getFullText()
    const config = Configuration.findConfiguration(configFile, file).results
    linter.lint(file, fileContents, config)
  })

  const results = linter.getResult()
  process.stdout.write(results.output)
}
