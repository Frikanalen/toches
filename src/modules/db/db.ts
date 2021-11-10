import knex from "knex"
import { IS_DEV } from "../core/constants"

const config = require("../../../knexfile")

export const db = knex({
  ...config,
  debug: IS_DEV,
})

export const testDBConnection = () => db.raw("select 1+1 as result")
