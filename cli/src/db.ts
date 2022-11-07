import knex from "knex"

const config = require("../../knexfile")

export const db = knex({
  ...config,
  pool: { max: 64 },
  acquireConnectionTimeout: 240000,
})

export const testDBConnection = () => db.raw("select 1+1 as result")
