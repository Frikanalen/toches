import { ASSIGNED_PERMISSIONS, ROOT_ROLE_NAME } from "../constants"
import { Permission, Role, RoleName } from "../types"

export const hasPermission = (roles: RoleName[], permission: Permission) => {
  if (roles.includes(ROOT_ROLE_NAME)) return true

  // Remove this "as any" when there is more than just the root role
  return roles.some((r) => (ASSIGNED_PERMISSIONS[r as Role] as any).includes(permission))
}
