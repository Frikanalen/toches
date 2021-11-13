import { Middleware } from "koa"
import {
  ASSIGNED_PERMISSIONS,
  PERMISSIONS,
  ROOT_ROLE_NAME,
} from "../../access-control/constants"
import { hasPermission } from "../../access-control/helpers/hasPermission"
import { Permission, RoleName } from "../../access-control/types"
import { HttpError } from "../../core/classes/HttpError"
import { UserData } from "../../user/models/userModel"

export type State = {
  user?: UserData
}

export const sendUserPermissionState = (): Middleware<State> => (context, next) => {
  const { hasPermission: permission } = context.query
  const { user } = context.state

  if (!user || !permission) {
    return next()
  }

  if (!user.roles) {
    throw new Error("user.roles is undefined! Did you forget { withRoles: true }?")
  }

  if (!PERMISSIONS.some((p) => p === permission)) {
    throw new HttpError(400, `Permission ${permission} doesn't exist.`)
  }

  const roleNames = user.roles.map((x) => x.name)

  if (hasPermission(roleNames as RoleName[], permission as any)) {
    context.body = { message: "Permission granted" }
    return
  }

  context.body = { message: "Permission denied" }
  context.status = 401
}
