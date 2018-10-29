export const config = {
  winston: {
    level: 'debug'
  },
  serverOptions: {
    port: 3001,
    endpoint: '/graphql',
    subscriptions: '/graphql',
    playground: '/graphql'
  }
}
