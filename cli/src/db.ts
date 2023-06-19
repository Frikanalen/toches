import knex from "knex"

const config = require("../../knexfile")

export const db = knex({
  ...config,
  pool: { max: 64 },
  acquireConnectionTimeout: 24000000,
})
