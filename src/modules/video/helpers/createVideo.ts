import { db } from "../../db/db"
import { videoModel } from "../models/videoModel"
import { ValidatedVideo } from "../schemas/videoSchema"
import { assignVideoCategories } from "./assignVideoCategories"
import { getVideo } from "./getVideo"

export const createVideo = async (
  data: ValidatedVideo,
  organization: number,
  user: number,
) => {
  const [id] = await db
    .insert({
      uploader_id: user,
      organization_id: organization,
      media_id: data.mediaId,
      title: data.title,
      description: data.description,
      jukeboxable: data.jukeboxable,
    })
    .into(videoModel.tableName)
    .returning<number[]>("id")

  await assignVideoCategories(id, data.categories)

  return getVideo(id)
}
