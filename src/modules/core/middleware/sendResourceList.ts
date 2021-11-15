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

export const sendResourceList =
  (action: GetListAction, serialize: (data: any) => any): Middleware =>
  async (context, next) => {
    const { offset, limit } = await object({
      offset: number().default(0).max(100000).min(0),
      limit: number().default(5).min(1).max(50),
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
