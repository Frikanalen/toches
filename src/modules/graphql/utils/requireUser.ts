import { TochesContext } from "../types"
import { AuthenticationError } from "apollo-server-koa"

export const requireUser = async ({ user }: TochesContext) => {
  if (!user) throw new AuthenticationError("Must be logged in")
  return user
}
