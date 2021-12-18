import { handleListQueries } from "../../core/helpers/handleListQuery"
import { ListOptions } from "../../core/middleware/sendResourceList"
import { playlistModel } from "../models/playlistModel"
import { playlistQuery, PlaylistQueryParams } from "../queries/playlistQuery"

export type Options = ListOptions & PlaylistQueryParams

export const getPlaylistList = async (options: Options) => {
  const { offset, limit, ...rest } = options

  const [query, count] = await playlistQuery.prepare(rest)

  query.from(playlistModel.tableName).offset(offset).limit(limit)
  count.from(playlistModel.tableName)

  return handleListQueries(playlistModel.parseFromQuery(query), count)
}
