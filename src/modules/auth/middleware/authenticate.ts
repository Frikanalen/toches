import { Middleware } from "koa"
import { getUser } from "../../user/helpers/getUser"
import { UserQueryParams } from "../../user/queries/userQuery"

export type Options = {
  /** The user must be authenticated to use this endpoint */
  required?: boolean
}

export const authenticate =
  (options?: UserQueryParams & Options): Middleware =>
  async (context, next) => {
    const { required, ...rest } = options ?? {}
    const { user: id } = context.session!

    if (!id && required) context.throw(401)

    if (id) context.state.user = await getUser(id, rest)

    return next()
  }
