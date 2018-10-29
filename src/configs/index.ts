/**
 * `fbi b -t`   : process.env.NODE_ENV=testing
 * `fbi b -p`   : process.env.NODE_ENV=production
 * `fbi s`      : process.env.NODE_ENV=development
 * `fbi b -dev` : process.env.NODE_ENV=development
 */
export const { configs } = require(`./env-${process.env.NODE_ENV}`)
