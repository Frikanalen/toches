export type Options = {
  columns: readonly string[]
  prefix: string
  table: string
}

export const getAliasedColumns = (options: Options) => {
  const { columns, prefix, table } = options

  return columns.map(column => {
    return `${table}.${column} as ${prefix}__${column}`
  })
}
