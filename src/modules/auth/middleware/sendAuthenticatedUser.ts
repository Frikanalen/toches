import { Middleware } from "koa"
import { serializeUser } from "../../user/helpers/serializeUser"

export const sendAuthenticatedUser = (): Middleware => async (context, next) => {
  const { user } = context.state

  if (!user) {
    context.body = {
      authenticated: false,
    }

    return next()
  }

  context.body = {
    authenticated: true,
    user: serializeUser({ withRoles: true })(user),
  }
}
