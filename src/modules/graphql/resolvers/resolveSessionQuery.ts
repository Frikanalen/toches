import { Resolver, Session } from "../../../generated/graphql"

export const resolveSessionQuery: Resolver<Session, any, any> = async (
  parent,
  args,
  context,
) => ({
  authenticated: !!context.ctx.session?.user,
})
