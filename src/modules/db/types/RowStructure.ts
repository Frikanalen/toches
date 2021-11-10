/** Describes how to parse row data */
export interface RowStructure {
  /** Prefix used for the row data.
   *
   * Example: User_username, where "User" is the prefix
   */
  prefix: string
  /** Name of the property the parsed object will be assigned to */
  property: string
  /** Subqueried row structures */
  subqueries?: Record<string, RowStructure>
  /** Nested row structures */
  children?: RowStructure[]
}
