import { Middleware } from "koa"
import { getUser } from "../../user/helpers/getUser"
import { UserQueryParams } from "../../user/queries/userQuery"

export const authenticate =
  (options?: UserQueryParams): Middleware =>
  async (context, next) => {
    const { user: id } = context.session!
    if (!id) return next()

    const user = await getUser(id, options)
    context.state.user = user

    return next()
  }
