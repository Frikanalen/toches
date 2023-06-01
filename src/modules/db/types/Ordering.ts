import * as yup from "yup"
import { Knex } from "knex"

export type Ordering<N extends string = string, P extends object = {}> = {
  orderBy: N
  schema: yup.ObjectSchema<yup.AnyObject>
  apply: (query: Knex.QueryBuilder, params: P) => void
}

export type InferOrderingParams<O> = O extends Ordering<infer N, infer P>[]
  ? P & { orderBy?: N[] }
  : never
