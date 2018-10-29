const generateSchema = require('./helpers/generate-schema')
const generateModel = require('./helpers/generate-model')
const generateBinding = require('./helpers/generate-binding')
const generateResolver = require('./helpers/generate-resolver')

const opts = ctx.options

module.exports = async () => {
  if (!opts.generate || !opts.generate.paths) {
    ctx.logger.warn(
      'Nothing to generate. Please check "generate" configs in "options.js"'
    )
  }
  // geneate schema types
  if (opts.generate.paths.schemaInput) {
    await generateSchema(opts.generate)
  }
  // geneate datamodel schema and data-bindings
  if (opts.generate.model) {
    await generateModel(opts.generate.model)
    await generateBinding(opts.generate.model)
  }
  // generate API resolvers
  if (
    opts.generate.paths.resolverTypesOutput &&
    opts.generate.paths.resolversOutput
  ) {
    await generateResolver(opts.generate)
  }
}
