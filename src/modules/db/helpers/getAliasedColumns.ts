export type Options = {
  columns: readonly string[]
  aliasPrefix: string
  table: string
}

/**
 *
 * This function maps a list of columns to a list of aliased columns.
 * @example
 * getAliasedColumns({
 *  columns: ["id", "name"],
 *  prefix: "video",
 *  table: "videos",
 * })
 * => ["videos.id as video__id", "videos.name as video__name"]
 *
 * @params columns List of columns to alias
 * @params prefix Prefix to use for alias
 * @params table Table to alias from
 * @returns
 */
export const getAliasedColumns = ({ columns, aliasPrefix, table }: Options) =>
  columns.map((column) => `${table}.${column} as ${aliasPrefix}__${column}`)
