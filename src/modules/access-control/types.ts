import { PERMISSIONS, ROLES, ROOT_ROLE_NAME } from "./constants"

export type RoleName = typeof ROLES[number]

export type Role = Exclude<RoleName, typeof ROOT_ROLE_NAME>
export type Permission = typeof PERMISSIONS[number]
