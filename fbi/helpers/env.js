module.exports = name => {
  const def = name === 'build' ? 'production' : 'development'
  try {
    const taskParams = ctx.task.getParams(name)
    if (taskParams) {
      return taskParams.t || taskParams.test
        ? 'testing'
        : taskParams.p || taskParams.prod
            ? 'production'
            : taskParams.d || taskParams.dev ? 'development' : def
    } else {
      return ''
    }
  } catch (err) {
    const argvs = process.argv.slice(2)
    if (argvs.length > 0 && (argvs.includes('-t') || argvs.includes('-test'))) {
      return 'test'
    }
    return def
  }
}
