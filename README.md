# fbi-project-graphql

GraphQL API Server template

> This is a fbi project template. If you haven't installed
> [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to
> install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- `fbi v3.0+`
- `node v7.6+`

## Features

- Code generation: generate 'schema types' and 'resolvers' base on schema
- GraphQLServer base on [graphql-yoga](https://github.com/prisma/graphql-yoga)
- Environment data config
- Local development server using [nodemon](https://github.com/remy/nodemon)
- Debug in VSCode

## Usage

1. **Add template**

   ```bash
   $ fbi add https://github.com/fbi-templates/fbi-project-graphql.git
   ```

1. **Create a project**

   ```bash
   $ fbi init graphql [target-folder] -o
   ```

1. **Run a task**

   ```bash
   # First run (generate code and start dev server)
   $ fbi g s

   # As long as the files in 'src/schema' have changed, you should run 'fbi g' again
   ```

- **Debug in VSCode**

  ```bash
  # 1. Start dev server
  $ fbi s

  # 2. Attach existing process:
  Press `F5` in VSCode (support breakpoints in `src`)
  ```

- **Update template**

  ```bash
  $ fbi up graphql
  ```

- **Update options**

  ```bash
  $ cd path/to/my-app
  $ fbi init -o
  ```

## Run the project in a production environment

```bash
$ npm start
```

## Tasks

### `generate`

- Description: Generate 'schema types' and 'resolvers' base on schema, config: `fbi/options.js generate`.
- Alias: `g`
- Examples:
  - `fbi g`

### `serve`

- Description: Compile and start development server.
- Alias: `s`
- Examples:
  - `fbi s`

### `build`

- Description: Build the project for the specified environment.
- Params:
  - `p/prod` `{Boolean}` (default) Production environment.
  - `t/test` `{Boolean}` Test environment.
- Alias: `b`
- Examples:
  - `fbi b -t`
  - `fbi b -p`

## More

- [Official templates](https://github.com/fbi-templates)
- [fbi documentation](https://neikvon.gitbooks.io/fbi/content/)

## License

[MIT](https://opensource.org/licenses/MIT)

## [Changelog](./CHANGELOG.md)
