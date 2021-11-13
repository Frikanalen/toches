import { Middleware } from "koa"
import { randomBytes } from "crypto"
import { promisify } from "util"
import { CSRF_COOKIE } from "../constants"

const randomBytesAsync = promisify(randomBytes)

export const sendCSRFToken = (): Middleware => async (context, next) => {
  await next()
  if (!context.session!.user) return

  const token = (await randomBytesAsync(64)).toString("hex")
  context.cookies.set(CSRF_COOKIE, token)
}
