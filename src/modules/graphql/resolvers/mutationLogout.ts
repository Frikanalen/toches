import { DeepPartial } from "utility-types"
import { MutationStatus, Resolver, UserMutationResult } from "../../../generated/graphql"
import { TochesContext } from "../types"

export const mutationLogout: Resolver<
  DeepPartial<UserMutationResult>,
  any,
  TochesContext
> = async (_, __, context) => {
  context.session = null

  return {
    status: MutationStatus.Success,
    user: null,
  }
}
