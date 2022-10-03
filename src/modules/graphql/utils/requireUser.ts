import { TochesContext } from "../types"
import { AuthenticationError } from "apollo-server-koa"

// Extract user ID from context - throws Apollo AuthenticationError
// if user is not logged in.
export const requireUser = async ({ session }: TochesContext) => {
  if (!session?.user) throw new AuthenticationError("Must be logged in")
  return session?.user
}
