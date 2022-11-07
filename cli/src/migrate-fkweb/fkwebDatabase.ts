require("dotenv/config")
import knex from "knex"

export const fkweb = knex({
  client: "pg",
  connection: process.env.FKWEB_DATABASE_URL,

  // High timeout because the migration uses a bunch of Promise.All;
  // spawning tons of database connections at once.
  acquireConnectionTimeout: 60000000,
})

export const testDBConnection = () => fkweb.raw("select 1+1 as result")
