import { Middleware } from "koa"
import { PERMISSIONS } from "../../access-control/constants"
import { hasPermission } from "../../access-control/helpers/hasPermission"
import { Permission } from "../../access-control/types"
import { HttpError } from "../../core/classes/HttpError"
import { resolveToValue } from "../../lang/array"
import { UserData } from "../../user/models/userModel"

export type State = {
  user?: UserData
}

const isPermission = (permission: string): permission is Permission =>
  PERMISSIONS.some((p) => p === permission)

export const sendUserPermissionState = (): Middleware<State> => (context, next) => {
  const { hasPermission: permissionParam } = context.query
  const { user } = context.state

  if (!user || !permissionParam) {
    return next()
  }

  if (!user.roles) {
    throw new Error("user.roles is undefined! Did you forget { withRoles: true }?")
  }

  const permission = resolveToValue(permissionParam)

  if (!isPermission(permission)) {
    throw new HttpError(400, `Permission ${permission} doesn't exist.`)
  }

  const roleNames = user.roles.map((x) => x.name)

  if (hasPermission(roleNames, permission)) {
    context.body = { message: "Permission granted" }
    return
  }

  context.body = { message: "Permission denied" }
  context.status = 401
}
