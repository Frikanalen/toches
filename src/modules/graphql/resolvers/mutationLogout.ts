import { Maybe, Resolver, Scalars } from "../../../generated/graphql"
import { TochesContext } from "../types"

export const mutationLogout: Resolver<
  Maybe<Scalars["Boolean"]>,
  any,
  TochesContext
> = async (parent, args, context) => (context.session = null)
