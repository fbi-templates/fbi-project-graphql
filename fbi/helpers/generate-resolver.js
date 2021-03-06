const { parse } = require('graphql')
const { generateCode } = require('graphqlgen')
const { parseModels } = require('graphqlgen/dist/parse')
const { relative, dirname, basename, join, sep } = require('path')
const { fs, path, style } = ctx.utils
const schemaImporter = require('./schema-importer')

async function writeTypes (types, config) {
  const filepath = path.cwd(config.output)
  const dir = dirname(filepath)
  await fs.mkdirp(dir)
  await fs.write(filepath, types)

  ctx.logger.log(
    `✔ Resolver interface definitons generated at ${style.green(relative(process.cwd(), filepath))}`
  )

  return filepath
}

async function writeResolvers (resolvers, config, typesFilepath) {
  if (!config['resolver-scaffolding']) {
    return
  }
  let dir = path.cwd(config['resolver-scaffolding'].output)
  if (await fs.exist(dir)) {
    dir += '-tmp'
    if (await fs.exist(dir)) {
      await fs.remove(dir)
    }
  }

  await Promise.all(
    resolvers.map(async f => {
      const filepath = join(dir, f.path)
      await fs.mkdirp(dirname(filepath))
      await fs.write(
        filepath,
        f.code.replace(
          '[TEMPLATE-INTERFACES-PATH]',
          relative(
            dirname(filepath),
            join(dirname(typesFilepath), basename(typesFilepath, '.ts'))
          ).replace(new RegExp('\\' + sep, 'g'), '/')
        )
      )
    })
  )
  ctx.logger.log(
    `✔ Resolvers scaffolded at ${style.green(relative(process.cwd(), dir))}`
  )
}

module.exports = async opts => {
  const config = {
    // (required) The target programming language for the generated code
    language: 'typescript',
    // (required) The file path pointing to your GraphQL schema
    // schema: './src/schema/schema.graphql',
    schema: opts.paths.schemaInput,
    // (required) Map SDL types from the GraphQL schema to TS models
    models: {
      files: [opts.paths.schemaTypesOutput]
    },
    // (required) Generated typings for resolvers and default resolver implementations
    // DO NOT EDIT THIS FILE
    output: opts.paths.resolverTypesOutput,
    // (required) Temporary scaffolded resolvers to copy and paste in your application
    'resolver-scaffolding': {
      output: opts.paths.resolversOutput,
      layout: 'file-per-type'
    }
    // (optional) Type definition for the resolver context object
    // context: {}
  }
  const _schema = schemaImporter(join(process.cwd(), config.schema), true)
  const schema = parse(_schema)

  const modelMap = parseModels(
    config.models,
    schema,
    config.output,
    config.language
  )

  const { generatedTypes, generatedResolvers } = generateCode({
    schema,
    language: config.language,
    config,
    modelMap,
    prettify: true,
    prettifyOptions: {
      semi: false,
      singleQuote: true,
      trailingComma: 'none',
      ...(opts.prettifyOptions || {})
    }
  })

  const typesFilepath = await writeTypes(generatedTypes, config)
  await writeResolvers(generatedResolvers, config, typesFilepath)
}
