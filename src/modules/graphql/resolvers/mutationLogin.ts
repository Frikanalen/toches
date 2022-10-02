import { MutationLoginArgs, Resolver, User } from "../../../generated/graphql"
import { authenticateUser } from "../../auth/helpers/authenticateUser"
import { AuthenticationError } from "apollo-server-koa"
import { db } from "../../db/db"

export const mutationLogin: Resolver<User, any, any, MutationLoginArgs> = async (
  parent,
  { email, password },
  context,
) => {
  const userId = await authenticateUser(email, password)

  context.session.user = userId

  if (userId) {
    return await db("users")
      .where("id", userId)
      .select("email", {
        firstName: "first_name",
        lastName: "last_name",
        id: db.raw<string>("id::text"),
      })
      .first()
  } else {
    throw new AuthenticationError("Incorrect username or password")
  }
}
