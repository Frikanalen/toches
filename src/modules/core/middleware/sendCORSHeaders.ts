import { Middleware } from "koa"
import { CSRF_HEADER } from "../../auth/constants"
import { IS_PROD } from "../constants"

export const sendCORSHeaders = (): Middleware => (context, next) => {
  const { method } = context

  if (IS_PROD) return next()

  context.set("Access-Control-Allow-Origin", "http://localhost")
  context.set("Access-Control-Allow-Credentials", "true")
  context.set("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS")
  context.set("Access-Control-Allow-Headers", [CSRF_HEADER, "Content-Type"].join(", "))

  if (method === "OPTIONS") {
    context.status = 200
  }

  return next()
}
