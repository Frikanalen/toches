import { handleListQueries } from "../../core/helpers/handleListQuery"
import { ListOptions } from "../../core/middleware/sendResourceList"
import { bulletinModel } from "../model"
import { bulletinQuery, BulletinQueryParams } from "../queries"

export type Options = ListOptions & BulletinQueryParams

export const getBulletinList = async (options: Options) => {
  const { offset, limit, ...rest } = options

  const [query, count] = await bulletinQuery.prepare(rest)

  query.from(bulletinModel.tableName).offset(offset).limit(limit)
  count.from(bulletinModel.tableName)

  return handleListQueries(bulletinModel.parseFromQuery(query), count)
}
