import { Knex } from "knex"
import { InferOrderingParams, Ordering } from "../types/Ordering"

export const applyOrdering = <O extends Ordering[]>(
  orderings: O,
  query: Knex.QueryBuilder,
  params: InferOrderingParams<O>,
  defaultOrdering: O[number]["name"][] = [orderings[0].name],
) => {
  const names = [...new Set(params.orderBy ?? defaultOrdering)]
  const filtered = names.map((name) => orderings.find((o) => name === o.name)!)

  for (const ordering of filtered) {
    ordering.apply(query, params)
  }
}
