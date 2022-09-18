import { Resolver, Session } from "../../../generated/graphql"
import { authenticateUser } from "../../auth/helpers/authenticateUser"

export const loginMutation: Resolver<
  Session,
  any,
  any,
  { email: string; password: string }
> = async (parent, args, context) => {
  const { email, password } = args

  const userId = await authenticateUser(email, password)

  context.ctx.session.user = userId

  return {
    authenticated: !!userId,
  }
}
