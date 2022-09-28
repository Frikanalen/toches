import { UserProfileData, Resolver } from "../../../generated/graphql"
import { getUser } from "../../user/helpers/getUser"
import { TochesContext } from "../types"

export const resolveProfile: Resolver<UserProfileData, any, TochesContext> = async (
  parent,
  args,
  context,
) => {
  // BOOKMARK: First shaky concept of user profile.
  // Now needs test-driven implementation of login & logout mutations,
  // and getUser needs review.
  const userId = context.session?.user

  const { id, email } = await getUser(userId)

  return { id: id.toString(), email }
}
