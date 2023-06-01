import * as yup from "yup"
import { Ordering } from "../../db/types/Ordering"

export type Params = {
  ascending?: boolean
}

export const createColumnOrdering = <N extends string>(
  orderBy: N,
  column: string,
): Ordering<N, Params> => ({
  orderBy,
  schema: yup.object({
    // Yup will not treat an empty string (?ascending) as a boolean, so we need to use a string shema.
    ascending: yup
      .string()
      .transform((value) => (typeof value === "string" ? "true" : "")),
  }),
  apply: (query, params) => {
    query.orderBy(column, params.ascending ? "ASC" : "DESC")
  },
})
