import { Middleware } from "koa"
import { HttpError } from "../../core/classes/HttpError"
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

    if (!id && required) {
      throw new HttpError(401, "Authentication required")
    }

    if (id) {
      const user = await getUser(id, rest)
      context.state.user = user
    }

    return next()
  }
