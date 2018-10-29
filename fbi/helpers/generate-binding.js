const { buildSchema } = require('graphql')
const { importSchema } = require('graphql-import')
const {
  PrismaTypescriptGenerator
} = require('prisma-binding/dist/PrismaTypescriptGenerator')
const { fs, path, style } = ctx.utils

module.exports = async opts => {
  const input = path.cwd(opts.output)
  const output = path.cwd(opts.bindingOuput)
  const args = {
    schema: buildSchema(importSchema(input)),
    inputSchemaPath: input,
    outputBindingPath: output
  }
  const generatorInstance = new PrismaTypescriptGenerator(args)
  const code = generatorInstance.render()
  await fs.write(output, code)

  ctx.logger.log(
    `✔ Prisma-binding generated at ${style.green(opts.bindingOuput)}`
  )
}
