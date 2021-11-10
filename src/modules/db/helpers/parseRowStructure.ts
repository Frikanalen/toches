import { RowStructure } from "../types/RowStructure"

/** Parses a row of data with prefixed keys into a structured object */
export const parseRowStructure = (row: Record<string, any>, structure: RowStructure) => {
  const { prefix, children = [], subqueries = {} } = structure
  const obj: Record<string, any> = {}

  if (!row) return null

  const subqueryKeys = Object.keys(subqueries)

  for (const [pair, value] of Object.entries(row)) {
    const [pref, key] = pair.split("__")

    // Parse subqueries correctly
    if (subqueryKeys.includes(key)) {
      const subStructure = subqueries[key]
      const arr = Array.isArray(value) ? value : [value]

      obj[key] = arr.map((v) => parseRowStructure(v, subStructure))

      continue
    }

    if (pref === prefix) {
      obj[key] = value
    }
  }

  for (const child of children) {
    obj[child.property] = parseRowStructure(row, child)
  }

  if (Object.values(obj).every((value) => value === null)) return null
  return obj
}
