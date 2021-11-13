import { Permission, Role } from "./types"

// Update this constant when adding roles for type safety
export const ROLES = ["root"] as const
export const ROOT_ROLE_NAME = "root"

// Update this constant when adding more permissions for type safety
export const PERMISSIONS = ["ATEM_CONTROL", "ADMIN_PANEL", "MANAGE_ROLES"] as const

export const ASSIGNED_PERMISSIONS: Record<Role, ReadonlyArray<Permission>> = {
  // This role bypasses all access control and thus has all permissions
  [ROOT_ROLE_NAME]: PERMISSIONS,

  // Assign permissions to roles here
}
