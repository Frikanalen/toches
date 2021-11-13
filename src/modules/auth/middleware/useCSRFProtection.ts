import { Middleware } from "koa"
import { HttpError } from "../../core/classes/HttpError"
import { CSRF_COOKIE, CSRF_HEADER, CSRF_SAFE_METHODS } from "../constants"

export const useCSRFProtection = (): Middleware => (context, next) => {
  const { session, method, headers, cookies } = context

  // We don't care about protecting non-authenticated routes or safe http methods
  // Routes that need authentication will 401 if session.user isn't present anyway
  if (!session?.user || CSRF_SAFE_METHODS.includes(method)) {
    return next()
  }

  const token = headers[CSRF_HEADER.toLowerCase()]
  const cookie = cookies.get(CSRF_COOKIE)

  if (token !== cookie) {
    throw new HttpError(403, "CSRF token missing or invalid")
  }

  return next()
}
