const { generateTypeScriptTypes } = require('graphql-schema-typescript')
const { mkdirp } = ctx.utils.fs
const { join } = ctx.utils.path
const { style } = ctx.utils
const schemaImporter = require('./schema-importer')

module.exports = async opts => {
  await mkdirp(opts.paths.schemaTypesOutput)
  const schema = schemaImporter(join(process.cwd(), opts.paths.schemaInput))
  await generateTypeScriptTypes(
    schema,
    opts.paths.schemaTypesOutput,
    opts.schemaTypesOptions
  )
  ctx.logger.log(
    `✔ Schema interface definitons generated at ${style.green(opts.paths.schemaTypesOutput)}`
  )
}
