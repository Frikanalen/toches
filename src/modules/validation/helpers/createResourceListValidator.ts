import { array, number, ValidationError } from "yup"
import { RequiredNumberSchema } from "yup/lib/number"
import { db } from "../../db/db"

export type Options = {
  tableName: string
  resourceName: string
  requireUnique?: boolean
}

export const createResourceListValidator = (options: Options) => {
  const { tableName, resourceName, requireUnique } = options
  const id = number().required() as RequiredNumberSchema<number>

  return array(id).test(async (value) => {
    if (!value) return true

    const unique = [...new Set(value)]
    const existing = await db
      .count()
      .from(tableName)
      .whereIn("id", unique)
      .first<{ count: number }>()

    const parsed = Number(existing.count)

    const isValid = parsed === unique.length
    const isUnique = unique.length === value.length

    if (isValid && (isUnique || !requireUnique)) {
      return true
    }

    throw new ValidationError(`Invalid ${resourceName} list`)
  })
}
