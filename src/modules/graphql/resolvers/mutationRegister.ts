import {
  MutationStatus,
  Resolver,
  UserMutationResult,
  UserMutationsRegisterArgs,
} from "../../../generated/graphql"
import { AuthenticationError } from "apollo-server-koa"
import { db } from "../../db/db"
import { DeepPartial } from "utility-types"
import { TochesContext } from "../types"
import { log } from "../../core/log"
import { GraphQLError } from "graphql/error"
import { hashPassword } from "../../auth/helpers/hashPassword"

export const mutationRegister: Resolver<
  DeepPartial<UserMutationResult>,
  any,
  TochesContext,
  UserMutationsRegisterArgs
> = async (parent, { input: { email, password } }, context) => {
  const [{ id: userId }] = await db("users").insert(
    { email, password: hashPassword(password) },
    ["id"],
  )

  if (!context.session) {
    log.error(`Context session was null`)
    throw new GraphQLError("Internal server error, could not update null session")
  }

  context.session.user = userId

  if (userId) {
    const user = await db("users")
      .where("id", userId)
      .select("email", {
        name: "name",
        id: db.raw<string>("id::text"),
      })
      .first()

    return {
      status: MutationStatus.Success,
      user,
    }
  } else {
    throw new AuthenticationError("Feil")
  }
}
