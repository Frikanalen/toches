import { ASSIGNED_PERMISSIONS } from "../constants"
import { Permission, Role } from "../types"

export const hasPermission = (roles: Role[], permission: Permission) => {
  return roles.some((r) => ASSIGNED_PERMISSIONS[r as Role].includes(permission))
}
