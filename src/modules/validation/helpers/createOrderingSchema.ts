import { array, ArraySchema, object, string, StringSchema } from "yup"
import { Ordering } from "../../db/types/Ordering"

export const createOrderingSchema = <O extends Ordering[], N extends O[number]["name"]>(
  orderings: O,
) => {
  const names = orderings.map((o) => o.name)

  const base = object({
    orderBy: array(string().oneOf(names)).transform((v, o: string) =>
      o.replace(/[\[\]"]/g, "").split(","),
    ) as ArraySchema<StringSchema<N>>,
  })

  return base.when("orderBy", (orderBy: N[]) => {
    const [first, ...rest] = orderings.filter((o) =>
      (orderBy ?? orderings[0].name).includes(o.name),
    )

    return rest.reduce((a, b) => a.concat(b.schema), base.concat(first.schema))
  })
}
