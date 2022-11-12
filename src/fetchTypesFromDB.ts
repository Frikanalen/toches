const { knex } = require("knex")
const { updateTypes } = require("knex-types")

const db = knex(require("../knexfile"))

console.log(
  "Remember to add type PostgresInterval = string to generated file and copy to CLI",
)

updateTypes(db, { output: "src/generated/tableTypes.ts" }).catch((err: any) => {
  console.error(err)
  process.exit(1)
})
