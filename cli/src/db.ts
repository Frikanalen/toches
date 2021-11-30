import knex from "knex"

const config = require("../../knexfile")

export const db = knex({
  ...config,
})

export const testDBConnection = () => db.raw("select 1+1 as result")
