import { handleListQueries } from "../../core/helpers/handleListQuery"
import { ListOptions } from "../../core/middleware/sendResourceList"
import { organizationModel } from "../models/organizationModel"
import { organizationQuery, OrganizationQueryParams } from "../queries/organizationQuery"

export type Options = ListOptions & OrganizationQueryParams

export const getOrganizationList = async (options: Options) => {
  const { offset, limit, ...rest } = options

  const [query, count] = await organizationQuery.prepare(rest)

  query.from(organizationModel.tableName).offset(offset).limit(limit)
  count.from(organizationModel.tableName)

  return handleListQueries(organizationModel.parseFromQuery(query), count)
}
