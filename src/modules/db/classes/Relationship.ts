import { Knex } from "knex"
import { getAliasedColumns } from "../helpers/getAliasedColumns"
import { Model } from "./Model"
import { DefaultQueryOptions, QueryTemplate } from "./QueryTemplate"

export type Options<O extends DefaultQueryOptions> = {
  /** The name of the column for the foreign key */
  key: string
  /** The model we're joining on */
  model: Model<any>
  /** A query template to merge with */
  template?: QueryTemplate<O>
  /** Alias for the joined table. Default is `model.tableName` */
  alias?: string
  /** Prefix for columns. Default is `model.structure.prefix` */
  prefix?: string
  /** Whether a left join or inner join should be used */
  optional?: boolean
}

export class Relationship<O extends DefaultQueryOptions> {
  constructor(private options: Options<O>) {}

  public apply(query: Knex.QueryBuilder, options: O) {
    const {
      key,
      model,
      template,
      alias = model.tableName,
      prefix = model.structure.prefix,
      optional,
    } = this.options

    query.select(
      getAliasedColumns({
        columns: model.columns,
        table: alias,
        prefix,
      }),
    )

    const joinType = optional ? "leftJoin" : "join"
    query[joinType](`${model.tableName} as ${alias}`, `${alias}.id`, key)

    template?.merge({ query, options: { ...options, single: true } })
  }
}
