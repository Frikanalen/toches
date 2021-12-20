import { videoModel } from "../../video/models/videoModel"
import { videoQuery } from "../../video/queries/videoQuery"

export const getJukeboxableVideos = async () => {
  const [query] = await videoQuery.prepare({})

  query.from(videoModel.tableName).where("videos.jukeboxable", true)

  return videoModel.parseFromQuery(query)
}
