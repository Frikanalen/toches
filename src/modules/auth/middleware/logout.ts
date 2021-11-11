import { Middleware } from "koa"

export const logout = (): Middleware => (context, next) => {
  context.session!.user = undefined
  context.body = {
    message: "Successfully logged out",
  }

  return next()
}
