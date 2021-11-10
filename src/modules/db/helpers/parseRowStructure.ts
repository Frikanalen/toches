import { toCamelCase } from "../../lang/string"
import { RowStructure } from "../types/RowStructure"

/** Parses a row of data with prefixed keys into a structured object */
export const parseRowStructure = (row: Record<string, any>, structure: RowStructure) => {
  const { prefix, children = [], subqueries = {} } = structure
  const obj: Record<string, any> = {}

  if (!row) return null

  const subqueryKeys = Object.keys(subqueries)

  for (const [pair, value] of Object.entries(row)) {
    const [pref, key] = pair.split("__")

    const safeKey = toCamelCase(key)

    // Parse subqueries correctly
    if (subqueryKeys.includes(safeKey)) {
      const subStructure = subqueries[safeKey]
      const arr = Array.isArray(value) ? value : [value]

      obj[safeKey] = arr.map((v) => parseRowStructure(v, subStructure))

      continue
    }

    if (pref === prefix) {
      obj[safeKey] = value
    }
  }

  for (const child of children) {
    obj[child.property] = parseRowStructure(row, child)
  }

  if (Object.values(obj).every((value) => value === null)) return null
  return obj
}
