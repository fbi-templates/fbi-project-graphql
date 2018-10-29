const generateCRUDSchemaString = require('prisma-generate-schema').default
const { fs, path, style } = ctx.utils

module.exports = async opts => {
  const modelString = await fs.read(path.cwd(opts.input))
  const schemaString = generateCRUDSchemaString(modelString)
  await fs.write(path.cwd(opts.output), schemaString)
  ctx.logger.log(`✔ DataModel schema generated to ${style.green(opts.output)}`)
}
