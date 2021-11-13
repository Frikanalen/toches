import { Permission, RoleName } from "./types"

// Update this constant when adding roles for type safety
export const ROLES = ["root"] as const

// This role bypasses all access control
export const ROOT_ROLE_NAME: RoleName = "root"

// Update this constant when adding more permsisions for type safety
export const PERMISSIONS = ["ATEM_CONTROL", "ADMIN_PANEL"] as const

export const ASSIGNED_PERMISSIONS: Record<
  Permission,
  ReadonlyArray<Exclude<RoleName, typeof ROOT_ROLE_NAME>>
> = {
  ATEM_CONTROL: [],
  ADMIN_PANEL: [],
}
