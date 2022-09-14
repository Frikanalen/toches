import { Middleware } from "koa"
import { CSRF_HEADER } from "../../auth/constants"
import { IS_PROD } from "../constants"

// Small hack to pass along the CORS headers in case of context.throw().
// If we don't do this, we get network errors rather than the appropriate
// status code in case of context.throw.
export const handleError = (): Middleware => async (ctx, next) => {
  try {
    return await next()
  } catch (err: any) {
    if (!IS_PROD) {
      ctx.set("Access-Control-Allow-Origin", "http://localhost:3000")
      ctx.set("Access-Control-Allow-Credentials", "true")
      ctx.set("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD")
      ctx.set("Access-Control-Allow-Headers", [CSRF_HEADER, "Content-Type"].join(", "))
    }

    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message,
    }
  }
}
