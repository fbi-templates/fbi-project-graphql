const { TypescriptGenerator } = require('graphql-binding')
const schemaImporter = require('./schema-importer')
const { mkdirp, write } = ctx.utils.fs
const { join, cwd } = ctx.utils.path
const { style } = ctx.utils

module.exports = async opts => {
  await mkdirp(opts.paths.schemaTypesOutput)
  const schema = schemaImporter(join(process.cwd(), opts.paths.schemaInput))
  const typescriptGenerator = new TypescriptGenerator({
    schema,
    inputSchemaPath: opts.paths.schemaInput,
    outputBindingPath: opts.paths.schemaTypesOutput
  })

  typescriptGenerator.scalarMapping = {
    Int: 'number',
    String: 'string',
    ID: 'string | number',
    Float: 'number',
    Boolean: 'boolean',
    DateTime: 'any', // 'Date | string': issue when generate resolvers
    Json: 'any'
  }

  const types = typescriptGenerator.renderTypes()

  await write(cwd(opts.paths.schemaTypesOutput), types)

  ctx.logger.log(
    `✔ Schema interface definitons generated at ${style.green(opts.paths.schemaTypesOutput)}`
  )
}
