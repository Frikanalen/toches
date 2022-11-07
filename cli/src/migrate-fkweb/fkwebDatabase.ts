require("dotenv/config")
import knex from "knex"

export const fkweb = knex({
  client: "pg",
  connection: process.env.FKWEB_DATABASE_URL,
})

export const testDBConnection = () => fkweb.raw("select 1+1 as result")
