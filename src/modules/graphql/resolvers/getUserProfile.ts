import { UserProfileData, Resolver } from "../../../generated/graphql"
import { getUser } from "../../user/helpers/getUser"
import { ParameterizedContext } from "koa"

type KoaContext = {
  ctx: ParameterizedContext
}

export const getUserProfile: Resolver<UserProfileData, any, KoaContext> = async (
  parent,
  args,
  context,
) => {
  // BOOKMARK: First shaky concept of user profile.
  // Now needs test-driven implementation of login & logout mutations,
  // and getUser needs review.
  const userId = context.ctx.session?.user

  const { id, email } = await getUser(userId)

  return { id: id.toString(), email }
}
