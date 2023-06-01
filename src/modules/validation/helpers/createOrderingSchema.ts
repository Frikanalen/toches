import { Ordering } from "../../db/types/Ordering"
import * as yup from "yup"

// I have no idea what this does...?
const transformList = (_: any, o: string) => {
  if (!o) return []
  return o
    .replace(/[\[\]"]/g, "")
    .split(",")
    .filter((val) => val !== "undefined")
}

export const createOrderingSchema = <
  TOrdering extends Ordering,
  TFieldName extends string = TOrdering["orderBy"],
>(
  orderings: TOrdering[],
) => {
  const names = orderings.map((o) => o.orderBy as TFieldName)

  const base = yup.object({
    orderBy: yup
      .array(yup.string().required().oneOf<TFieldName>(names))
      .transform(transformList),
  })

  return base.when("orderBy", ([orderBy]: TFieldName[], schema) => {
    const ordering = orderBy ?? orderings[0].orderBy

    return schema.concat(orderings.find((o) => o.orderBy === ordering)!.schema)
  })
}
