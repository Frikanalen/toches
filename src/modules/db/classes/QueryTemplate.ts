import { Knex } from "knex"
import { db } from "../db"

export type QueryContext<O extends object> = {
  query: Knex.QueryBuilder
  options: O
}

export type DefaultQueryOptions = {
  single?: boolean
  count?: boolean
}

export type QueryTemplateOptions<O extends object> = {
  build: (context: QueryContext<O>) => Promise<void>
  prepare: () => Knex.QueryBuilder
  prepareCount?: () => ReturnType<typeof defaultPrepareCount>
}

const defaultPrepareCount = () => db.count().first<{ count: number }>()

export class QueryTemplate<O extends DefaultQueryOptions = DefaultQueryOptions> {
  constructor(private options: QueryTemplateOptions<O>) {}

  private async build(options: O) {
    const { build, prepare, prepareCount = defaultPrepareCount } = this.options

    const query = prepare()
    const count = prepareCount()

    await build({ query, options })
    await build({ query: count, options: { ...options, count: true } })

    return [query, count] as const
  }

  /**
   * Use this query template with an existing query context. This allows you to re-use existing query templates to avoid repetition.
   *
   * **Do not merge before adding all your joins, or you will get a missing FROM-clause error!**
   * */
  public async merge(context: QueryContext<O>) {
    return this.options.build({
      ...context,
      options: {
        ...context.options,
        single: true,
      },
    })
  }

  public async prepare(options: O) {
    return this.build(options)
  }
}
