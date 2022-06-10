import { Middleware } from "koa"
import { log } from "../log"
import { HttpError } from "../classes/HttpError"
import { ValidationError } from "yup"

export const handleError = (): Middleware => async (ctx, next) => {
  try {
    return await next()
  } catch (error) {
    log.error(error)

    if (error instanceof HttpError) {
      ctx.status = error.code
      ctx.res.write(error.reason + "\n")
    }

    if (error instanceof ValidationError) {
      ctx.status = 400
      ctx.res.write(error.errors.toString())
      ctx.res.end()
    }
  }
}
