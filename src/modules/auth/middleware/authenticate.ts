import { Middleware } from "koa"
import { getUser } from "../../user/helpers/getUser"

export const authenticate = (): Middleware => async (context, next) => {
  const { user: id } = context.session!
  if (!id) return next()

  const user = await getUser(id)
  context.state.user = user

  return next()
}
