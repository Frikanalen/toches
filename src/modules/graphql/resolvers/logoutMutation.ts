import { Maybe, Resolver, Scalars } from "../../../generated/graphql"

export const logoutMutation: Resolver<Maybe<Scalars["Boolean"]>, any, any> = async (
  parent,
  args,
  context,
) => {
  context.ctx.session = null
  return true
}
