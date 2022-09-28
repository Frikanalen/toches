import { TochesContext } from "../graphql/types"
import { ROLE_PERMISSIONS, ROLES } from "./constants"

export type Role = typeof ROLES[number]
export type RolePermission = typeof ROLE_PERMISSIONS[number]

export type Permission = {
  name: string
  check: (context: TochesContext) => Promise<void>
}
