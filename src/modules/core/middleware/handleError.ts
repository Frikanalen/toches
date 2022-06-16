import { Middleware } from "koa"
import { ValidationError } from "yup"

export const handleError = (): Middleware => async (ctx, next) => {
  try {
    return await next()
  } catch (error) {
    if (error instanceof ValidationError) ctx.throw(400, error.errors.toString())

    throw error
  }
}
