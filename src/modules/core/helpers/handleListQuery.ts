import { Knex } from "knex"

export const handleListQueries = async (
  listPromise: Promise<any[]>,
  countQuery: Knex.QueryBuilder<any, { count: number }>,
) => {
  const [rows, countRow] = await Promise.all([listPromise, countQuery])
  return { rows, count: Number(countRow.count) }
}
