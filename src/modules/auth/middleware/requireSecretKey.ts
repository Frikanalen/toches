import { Middleware } from "koa"
import { SECRET_KEY, SECRET_KEY_HEADER } from "../constants"
import { IS_DEV } from "../../core/constants"
import { log } from "../../core/log"

export const requireSecretKey = (): Middleware => (context, next) => {
  if (context.get(SECRET_KEY_HEADER) !== SECRET_KEY)
    if (IS_DEV) {
      log.debug(`Permitting request without secret key in dev mode`)
      return next()
    } else context.throw(400, `${SECRET_KEY_HEADER} missing or incorrect`)

  return next()
}
