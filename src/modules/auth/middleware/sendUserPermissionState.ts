import { Middleware } from "koa"
import { ROLE_PERMISSIONS } from "../../access-control/constants"
import { hasPermission } from "../../access-control/helpers/hasPermission"
import { RolePermission } from "../../access-control/types"
import { resolveToValue } from "../../lang/array"
import { UserData } from "../../user/models/userModel"

export type State = {
  user?: UserData
}

const isPermission = (permission: string): permission is RolePermission =>
  ROLE_PERMISSIONS.some((p) => p === permission)

export const sendUserPermissionState = (): Middleware<State> => (context, next) => {
  const { hasPermission: permissionParam } = context.query
  const { user } = context.state

  if (!permissionParam) return next()

  if (!user) {
    context.throw(401, "Authentication required")
    return
  }

  if (!user.roles)
    context.throw(500, "user.roles is undefined! Did you forget { withRoles: true }?")

  const permission = resolveToValue(permissionParam) as RolePermission

  if (!isPermission(permission))
    context.throw(500, `Permission ${permission} doesn't exist.`)

  const roleNames = user.roles?.map((x) => x.name) ?? []

  if (hasPermission(roleNames, permission)) {
    context.body = { message: "Permission granted" }
    return
  }

  context.body = { message: "Permission denied" }
  context.status = 401
}
