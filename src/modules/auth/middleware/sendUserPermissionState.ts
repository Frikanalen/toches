import { Middleware } from "koa"
import { ASSIGNED_PERMISSIONS, ROOT_ROLE_NAME } from "../../access-control/constants"
import { Permission } from "../../access-control/types"
import { HttpError } from "../../core/classes/HttpError"
import { UserData } from "../../user/models/userModel"

export type State = {
  user?: UserData
}

export const sendUserPermissionState = (): Middleware<State> => (context, next) => {
  const { hasPermission } = context.query
  const { user } = context.state

  if (!user || !hasPermission) {
    return next()
  }

  if (!user.roles) {
    throw new Error("user.roles is undefined! Did you forget { withRoles: true }?")
  }

  const roleNames = user.roles.map((x) => x.name)
  const permissions = ASSIGNED_PERMISSIONS[hasPermission as Permission]

  if (!permissions) {
    throw new HttpError(400, `Permission ${hasPermission} doesn't exist.`)
  }

  if (
    roleNames.includes(ROOT_ROLE_NAME) ||
    permissions.some((p) => roleNames.includes(p as string))
  ) {
    context.body = { message: "Permission granted" }
    return
  }

  context.body = { message: "Permission denied" }
  context.status = 401
}
