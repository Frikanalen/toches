import { Middleware } from "koa"
import { SECRET_KEY, SECRET_KEY_HEADER } from "../constants"

export const requireSecretKey = (): Middleware => (context, next) => {
  if (context.get(SECRET_KEY_HEADER) !== SECRET_KEY)
    context.throw(400, `${SECRET_KEY_HEADER} missing or incorrect`)

  return next()
}
