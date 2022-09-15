const { knex } = require("knex")
const { updateTypes } = require("knex-types")

const db = knex(require("../knexfile"))

updateTypes(db, { output: "src/generated/tableTypes.ts" }).catch((err: any) => {
  console.error(err)
  process.exit(1)
})
