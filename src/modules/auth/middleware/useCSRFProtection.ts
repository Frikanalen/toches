import { Middleware } from "koa"
import { CSRF_COOKIE, CSRF_HEADER, CSRF_SAFE_METHODS } from "../constants"
import { createCSRFToken } from "../helpers/createCSRFToken"
import { log } from "../../core/log"

export const useCSRFProtection = (): Middleware => async (context, next) => {
  const { session, method, headers, cookies } = context

  const token = headers[CSRF_HEADER.toLowerCase()]
  const cookie = cookies.get(CSRF_COOKIE)

  // Ensure there's always a token
  if (!cookie) {
    cookies.set(CSRF_COOKIE, await createCSRFToken(), {
      httpOnly: false,
    })
  }

  // We don't care about protecting non-authenticated routes or safe http methods
  // Routes that need authentication will 401 if session.user isn't present anyway
  if (!session?.user || CSRF_SAFE_METHODS.includes(method)) {
    return next()
  }

  if (token !== cookie) {
    log.debug({ token, cookie })
    context.throw(403, "CSRF token missing or invalid")
  }

  return next()
}
