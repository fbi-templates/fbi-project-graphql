import { GraphQLServer } from 'graphql-yoga'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import { logger } from './helpers/logger'
import { resolvers } from './resolvers'
import { configs } from './configs'

const loggerMiddleware = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  logger.debug(
    `Request=> ${info.operation.operation} ${
      info.fieldName
    }, Args=> ${JSON.stringify(args)}`
  )
  const timeStart = Date.now()

  const result = await resolve(root, args, context, info)

  logger.debug(
    `Response(${Date.now() - timeStart}ms)=> ${JSON.stringify(result)}`
  )
  return result
}

const typeDefs = mergeTypes(fileLoader(`${__dirname}/schema/**/*.graphql`), {
  all: true
})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [loggerMiddleware],
  context: {}
} as any)

server
  .start(configs.serverOptions, ({ port }) => {
    logger.info(
      `🚀 Server ready at http://localhost:${port}${
        configs.serverOptions.endpoint
      }`
    )
  })
  .catch(err => {
    throw err
  })
