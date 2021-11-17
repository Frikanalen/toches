import { handleListQueries } from "../../core/helpers/handleListQuery"
import { ListOptions } from "../../core/middleware/sendResourceList"
import { videoModel } from "../models/videoModel"
import { videoQuery, VideoQueryParams } from "../queries/videoQuery"

export type Options = ListOptions & VideoQueryParams

export const getVideoList = async (options: Options) => {
  const { offset, limit, ...rest } = options

  const [query, count] = await videoQuery.prepare(rest)

  query.from(videoModel.tableName).offset(offset).limit(limit)
  count.from(videoModel.tableName)

  return handleListQueries(videoModel.parseFromQuery(query), count)
}
