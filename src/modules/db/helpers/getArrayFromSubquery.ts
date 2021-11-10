import { Knex } from "knex"
import { db } from "../db"

export const getArrayFromSubquery = (query: Knex.QueryBuilder, alias: string) => {
  return db.raw(`ARRAY(
    SELECT
      row_to_json("subquery")
    FROM ( ${query.toQuery()} ) as "subquery"
  ) as "${alias}"
`)
}
