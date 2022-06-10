import { Middleware } from "koa"
import { CSRF_COOKIE } from "../constants"
import { createCSRFToken } from "../helpers/createCSRFToken"

export const sendNewCSRFToken = (): Middleware => async (context, _next) => {
  context.cookies.set(CSRF_COOKIE, await createCSRFToken(), {
    httpOnly: false,
  })
}
