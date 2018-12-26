module.exports = {
  tslint: true,

  generate: {
    paths: {
      schemaInput: './src/schema/**/*.graphql',
      schemaTypesOutput: './src/generated/schema-types.ts',
      resolverTypesOutput: './src/generated/resolver-types.ts',
      resolversOutput: './src/resolvers'
    },
    prettifyOptions: {
      semi: false,
      singleQuote: true,
      trailingComma: 'none'
    }
  },

  nodemon: {
    ext: 'ts graphql',
    verbose: true,
    ignore: ['node_modules', 'test', 'fbi', '.git'],
    watch: ['src/**/*.ts', 'src/**/*.graphql'],
    inspect: false
  },

  build: {
    ignore: ['./resolvers-tmp']
  },

  // file or directories to copy (Destination: 'dist')
  copy: {
    'package.json': true,
    node_modules: false,
    ignore: ['**/*.{js,ts}', '.DS_Store', 'configs/pm2-*.json', 'types/**/*']
  }
}
