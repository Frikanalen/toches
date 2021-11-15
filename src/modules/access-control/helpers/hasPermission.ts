import { ASSIGNED_PERMISSIONS } from "../constants"
import { RolePermission, Role } from "../types"

export const hasPermission = (roles: Role[], permission: RolePermission) => {
  return roles.some((r) => ASSIGNED_PERMISSIONS[r as Role].includes(permission))
}
