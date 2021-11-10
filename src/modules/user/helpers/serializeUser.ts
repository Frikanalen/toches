import { UserData } from "../models/userModel"

export const serializeUser = (data: UserData) => {
  const { id, firstName, lastName, createdAt } = data
  return { id, firstName, lastName, createdAt }
}
