import {
  MutationStatus,
  Resolver,
  UserMutationResult,
  UserMutationsLoginArgs,
} from "../../../generated/graphql"
import { authenticateUser } from "../../auth/helpers/authenticateUser"
import { AuthenticationError } from "apollo-server-koa"
import { db } from "../../db/db"
import { DeepPartial } from "utility-types"
import { TochesContext } from "../types"
import { log } from "../../core/log"
import { GraphQLError } from "graphql/error"

export const mutationLogin: Resolver<
  DeepPartial<UserMutationResult>,
  any,
  TochesContext,
  UserMutationsLoginArgs
> = async (parent, { input: { email, password } }, context) => {
  const userId = await authenticateUser(email, password)

  if (!context.session) {
    log.error(`Context session was null`)
    throw new GraphQLError("Internal server error, could not update null session")
  }

  context.session.user = userId

  if (userId) {
    const user = await db("users")
      .where("id", userId)
      .select("email", {
        firstName: "first_name",
        lastName: "last_name",
        id: db.raw<string>("id::text"),
      })
      .first()

    return {
      status: MutationStatus.Success,
      user,
    }
  } else {
    throw new AuthenticationError("Feil brukernavn eller passord")
  }
}
