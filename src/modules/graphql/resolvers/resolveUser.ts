import { Resolver, User } from "../../../generated/graphql"
import { TochesContext } from "../types"
import { db } from "../../db/db"
import { AuthenticationError } from "apollo-server-koa"

export const resolveUser: Resolver<User, any, TochesContext> = async (
  parent,
  args,
  { session },
) => {
  if (!session?.user) throw new AuthenticationError("Must be logged in")

  return db("users")
    .where("id", session.user)
    .select("email", {
      name: "name",
      id: db.raw<string>("id::text"),
    })
    .first()
}
