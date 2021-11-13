import { Permission, Role, RoleName } from "./types"

// Update this constant when adding roles for type safety
export const ROLES = ["root"] as const

// This role bypasses all access control
export const ROOT_ROLE_NAME = "root"

// Update this constant when adding more permissions for type safety
export const PERMISSIONS = ["ATEM_CONTROL", "ADMIN_PANEL", "MANAGE_ROLES"] as const

// Assign permissions to roles here
export const ASSIGNED_PERMISSIONS: Record<Role, Permission[]> = {}
