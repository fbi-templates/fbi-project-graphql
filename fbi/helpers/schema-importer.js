const { buildSchema } = require('graphql')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')

module.exports = (src, onlyTypes) => {
  const typeDefs = mergeTypes(fileLoader(src), {
    all: true
  })

  if (onlyTypes) {
    return typeDefs
  }
  return buildSchema(typeDefs)
}
