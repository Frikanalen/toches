import { Resolver, Session } from "../../../generated/graphql"
import { TochesContext } from "../types"

export const resolveSessionQuery: Resolver<Session, any, TochesContext> = async (
  parent,
  args,
  context,
) => ({
  authenticated: !!context.session?.user,
})
