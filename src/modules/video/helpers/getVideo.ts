import { videoModel } from "../models/videoModel"
import { videoQuery } from "../queries/videoQuery"

export const getVideo = async (id: number) => {
  const [query] = await videoQuery.prepare({ single: true })

  query.from(videoModel.tableName).where("videos.id", id).first()

  const [video] = await videoModel.parseFromQuery(query)
  return video
}
