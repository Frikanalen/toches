import { ObjectSchema } from "yup"
import { Knex } from "knex"
import { ObjectShape } from "yup/lib/object"

export type Ordering<N extends string = any, P extends object = {}> = {
  name: N
  schema: ObjectSchema<ObjectShape>
  apply: (query: Knex.QueryBuilder, params: P) => void
}

export type InferOrderingParams<O> = O extends Ordering<infer N, infer P>[]
  ? P & { orderBy?: N[] }
  : never
