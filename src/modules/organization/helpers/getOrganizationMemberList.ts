import { Knex } from "knex"
import { handleListQueries } from "../../core/helpers/handleListQuery"
import { ListOptions } from "../../core/middleware/sendResourceList"
import { userModel } from "../../user/models/userModel"
import { userQuery } from "../../user/queries/userQuery"

export type Options = ListOptions & {
  organization: number
}

export const getOrganizationMemberList = async (options: Options) => {
  const { organization, offset, limit } = options
  const [query, count] = await userQuery.prepare({})

  query.from(userModel.tableName).offset(offset).limit(limit)
  count.from(userModel.tableName)

  const addJoin = (query: Knex.QueryBuilder) => {
    query
      .join("organization_members", "organization_members.user_id", "users.id")
      .where("organization_members.organization_id", organization)
  }

  addJoin(query)
  addJoin(count)

  return handleListQueries(userModel.parseFromQuery(query), count)
}
