import { array, number, ValidationError } from "yup"
import { RequiredNumberSchema } from "yup/lib/number"
import { db } from "../../db/db"

export const validateCategoryIds = () => {
  const id = number().required() as RequiredNumberSchema<number>

  return array(id).test(async (value) => {
    if (!value) return true

    const unique = [...new Set(value)]
    const existing = await db
      .count()
      .from("categories")
      .whereIn("id", unique)
      .first<{ count: number }>()

    if (existing.count === unique.length && unique.length === value.length) {
      return true
    }

    throw new ValidationError("Invalid category list")
  })
}
