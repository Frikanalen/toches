import { userModel } from "../models/userModel"
import { userQuery, UserQueryParams } from "../queries/userQuery"

export const getUser = async (id: number, options?: UserQueryParams) => {
  const [query] = await userQuery.prepare({ single: true, ...options })

  query.from(userModel.tableName).where("users.id", id).first()

  const [user] = await userModel.parseFromQuery(query)
  return user
}
