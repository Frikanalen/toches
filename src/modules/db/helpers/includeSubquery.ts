import { Knex } from "knex"
import { db } from "../db"

// This is a helper function for Knex that allows you to include a subquery
// as a column in a query. It's useful for things like including a list of
// categories or assets in a video query.
export const includeSubquery = (query: Knex.QueryBuilder, queryName: string) =>
  db.raw(`ARRAY(
    SELECT
      row_to_json("subquery")
    FROM ( ${query.toQuery()} ) as "subquery"
  ) as "${queryName}"
`)
