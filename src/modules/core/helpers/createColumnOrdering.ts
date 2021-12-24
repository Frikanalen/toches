import { object, string } from "yup"
import { Ordering } from "../../db/types/Ordering"

export type Params = {
  ascending?: boolean
}

export const createColumnOrdering = <N extends string>(
  name: N,
  column: string,
): Ordering<N, Params> => ({
  name,
  schema: object({
    // Yup will not treat an empty string (?ascending) as a boolean, so we need to use a string shema.
    ascending: string().transform((value) => (typeof value === "string" ? "true" : "")),
  }),
  apply: (query, params) => {
    query.orderBy(column, params.ascending ? "ASC" : "DESC")
  },
})
