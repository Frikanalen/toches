import { Middleware, ParameterizedContext } from "koa"
import { object, number } from "yup"

export type GetListAction = (options: {
  offset: number
  limit: number
  context: ParameterizedContext
}) => Promise<{
  rows: any[]
  count: number
}>

export type ListOptions = {
  offset: number
  limit: number
}

export type Options = {
  offset?: number
  limit?: number
  maxLimit?: number
}

export const sendResourceList =
  (action: GetListAction, serialize: (data: any) => any, options?: Options): Middleware =>
  async (context, next) => {
    const { offset, limit } = await object({
      offset: number()
        .default(options?.offset ?? 0)
        .max(100000)
        .min(0),
      limit: number()
        .default(options?.limit ?? 5)
        .min(1)
        .max(options?.maxLimit ?? 50),
    }).validate(context.query)

    const { rows, count } = await action({ offset, limit, context })

    context.body = {
      rows: rows.map(serialize),
      offset,
      limit,
      count,
    }

    return next()
  }
