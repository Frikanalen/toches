import knex from "knex"
import { IS_DEV, IS_VERBOSE } from "../core/constants"

const config = require("../../../knexfile")

export const db = knex({
  ...config,
  debug: IS_DEV && IS_VERBOSE,
})

export const testDBConnection = () => db.raw("set session timezone to 'Europe/Oslo'")
