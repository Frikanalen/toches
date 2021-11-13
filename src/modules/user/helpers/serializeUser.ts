import { UserData } from "../models/userModel"
import { UserQueryParams } from "../queries/userQuery"

export const serializeUser = (options?: UserQueryParams) => (data: UserData) => {
  const { id, firstName, lastName, createdAt } = data
  const roles = options?.withRoles ? data.roles!.map((r) => r.name) : undefined

  return { id, firstName, lastName, createdAt, roles }
}
