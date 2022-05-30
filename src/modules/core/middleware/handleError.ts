import { Middleware } from "koa"
import { log } from "../log"

export const handleError = (): Middleware => async (_context, next) => {
  try {
    return await next()
  } catch (error) {
    log.error(error)
  }
}
