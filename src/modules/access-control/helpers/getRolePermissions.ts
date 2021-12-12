import { ASSIGNED_PERMISSIONS } from "../constants"
import { Role } from "../types"

export const getRolePermissions = (roles: string[]) => {
  return roles.map((x) => ASSIGNED_PERMISSIONS[x as Role]).flat()
}
